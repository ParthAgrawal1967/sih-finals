# backend/simulation/engine.py
from .state import make_initial_state, clone_state
from .utils import apply_pending_production_update, safe_div, clip
from .scenarios import apply_subsidy_policy, apply_weather_shock, apply_political_shock, apply_commodity_shock
from .constants import DEFAULT_ALPHA

def simulate_scenario(
    *,
    initial_state: dict,
    horizon_months: int,
    scenario_type: str = "baseline",
    scenario_parameters: dict = None,
    # Baseline callables (injected from app.py)
    forecast_global_fn,
    predict_imports_fn,
    compute_cif_fn,
    compute_landed_fn,
    compute_retail_price_fn,
    compute_farmer_price_fn,
    compute_govt_revenue_fn,
    compute_import_dependency_fn,
    indian_feature_template=None,
    indian_feature_order=None,
):
    """
    Master recursive month-by-month simulator.

    - initial_state: dict representing month t (constructed from LAST_INDIA_ROW & last global)
    - forecast_global_fn(last_window, months) -> list of predicted global prices (we may call only 1 month at a time)
    - predict_imports_fn(X_df) -> numpy array preds
    - compute_* functions used to compute economics (passed from app)
    - Returns a dict with 'time_series' and 'final_summary'
    """

    params = scenario_parameters or {}
    scenario = scenario_type or "baseline"

    # Make working copy
    state = clone_state(initial_state)

    # We will produce horizon_months outputs (1..N)
    time_series = []

    # To keep a rolling window for global recursive forecast we accept either:
    # - caller may pass last_global_window inside scenario_parameters (preferred),
    # - or we will call forecast_global_fn with current price only, one-step at a time.
    last_global_window = params.get("last_global_window", None)

    # For simplicity, if forecast_global_fn supports batch months, we call it once and iterate.
    # But to enforce the "one-step recursive" rule we will produce one global forecast step per iteration (call with most recent window).
    # If last_global_window is provided as full rows, we use that; else we maintain a simple queue of last scalar prices.
    # last_global_window should be a list-like of length TIME_STEPS each being scalar or full-feature row.
    # If not provided, initialize with current state's global price repeated.
    if not last_global_window:
        last_global_window = [state["global_cpo_price_usd_per_tonne"]] * 3

    # iterate month-by-month
    for i in range(horizon_months):
        # ---------- 1) Global forecast for this next month (one-step) ----------
        try:
            # forecast one month ahead using provided callable; we pass a one-step horizon
            next_global = forecast_global_fn(last_global_window, 1)
            if not isinstance(next_global, (list, tuple)) or len(next_global) == 0:
                raise RuntimeError("forecast_global_fn returned no predictions")
            gp = float(next_global[0])
        except Exception as e:
            raise RuntimeError(f"Global forecast call failed: {e}")

        # Update last_global_window (shift) using same representation (assume scalar price)
        last_global_window = list(last_global_window[1:]) + [gp]

        # Put predicted global price into current state (this is price for month t+1)
        state["global_cpo_price_usd_per_tonne"] = gp

        # ---------- 2) Apply scenario rules for *this* month ----------
        # The scenario functions modify state in place deterministically.
        if scenario == "subsidy":
            state = apply_subsidy_policy(state, params)
        elif scenario == "weather":
            state = apply_weather_shock(state, params)
        elif scenario == "political":
            state = apply_political_shock(state, params)
        elif scenario == "commodity":
            state = apply_commodity_shock(state, params)
        else:
            # baseline: no scenario modifications
            pass

        # ---------- 3) Before predicting imports, apply any pending production updates scheduled previously ----------
        # (This ensures the 1-2 month delayed biological response works: pending multipliers were set last iteration)
        state = apply_pending_production_update(state)

        # ---------- 4) Build input features for India imports model (use template fields if provided) ----------
        # We'll create a minimal feature row using indian_feature_template if available; otherwise build naive row.
        feature_row = {}
        if indian_feature_template:
            feature_row = indian_feature_template.copy()
            # plug current dynamic variables
            feature_row["global_cpo_price_usd_per_tonne"] = float(state["global_cpo_price_usd_per_tonne"])
            feature_row["usd_inr"] = float(params.get("usd_inr", feature_row.get("usd_inr", 82.5)))
            feature_row["freight_usd"] = float(params.get("freight_usd", feature_row.get("freight_usd", 22.0)))
            feature_row["domestic_consumption_tonnes"] = float(params.get("domestic_consumption_tonnes", feature_row.get("domestic_consumption_tonnes", 950000.0)))
            feature_row["domestic_production_tonnes"] = float(state.get("production_tonnes", feature_row.get("domestic_production_tonnes", 400000.0)))
            feature_row["demand_supply_gap"] = float(feature_row["domestic_consumption_tonnes"] - feature_row["domestic_production_tonnes"])
            feature_row["tariff_pct"] = float(params.get("tariff_pct", state.get("tariff_pct", 0.0)))
            # imports lags: use previous state imports
            feature_row["imports_tonnes_lag1"] = float(state.get("imports_tonnes", 0.0))
            feature_row["imports_tonnes_lag3"] = float(state.get("imports_tonnes", 0.0))
            feature_row["imports_tonnes_lag6"] = float(state.get("imports_tonnes", 0.0))
        else:
            # minimal fallback
            feature_row = {
                "global_cpo_price_usd_per_tonne": float(state["global_cpo_price_usd_per_tonne"])
            }

        # Build DataFrame shape expected by predict_imports_fn (that function comes from app.py)
        import pandas as pd
        if indian_feature_order:
            X_df = pd.DataFrame([[feature_row.get(c, 0.0) for c in indian_feature_order]], columns=indian_feature_order)
        else:
            X_df = pd.DataFrame([feature_row])

        # ---------- 5) Predict imports using XGBoost baseline ----------
        try:
            preds = predict_imports_fn(X_df)
            imports_tonnes = float(preds[0])
        except Exception as e:
            raise RuntimeError(f"Indian imports prediction failed: {e}")

        state["imports_tonnes"] = imports_tonnes

        # ---------- 6) Economics calculations ----------
        try:
            cif = compute_cif_fn(state["global_cpo_price_usd_per_tonne"], feature_row.get("usd_inr", 82.5), feature_row.get("freight_usd", 22.0))
            landed = compute_landed_fn(cif, feature_row.get("tariff_pct", state.get("tariff_pct", 0.0)))
            retail = compute_retail_price_fn(landed)
            farmer_market_price = compute_farmer_price_fn(landed, params.get("farmer_margin_fraction", 0.1))  # NOTE: this is baseline's heuristic
            # farmer_effective may have already been modified by subsidy; if not, set equal
            farmer_effective = state.get("farmer_effective_price_inr_per_tonne", farmer_market_price)
            govt_rev = compute_govt_revenue_fn(imports_tonnes, landed, cif)
            imp_dep = compute_import_dependency_fn(imports_tonnes, feature_row.get("domestic_consumption_tonnes", 1.0))
        except Exception as e:
            raise RuntimeError(f"Economics computation failed: {e}")

        # update state economics
        state["landed_cost_inr_per_tonne"] = float(landed)
        state["retail_price_inr_per_litre"] = float(retail)
        state["farmer_market_price_inr_per_tonne"] = float(farmer_market_price)
        # if subsidy applied earlier, farmer_effective already overwritten; otherwise set to market price
        if "farmer_effective_price_inr_per_tonne" not in state or state.get("farmer_effective_price_inr_per_tonne") is None:
            state["farmer_effective_price_inr_per_tonne"] = float(farmer_market_price)
        state["government_revenue_inr"] = float(govt_rev)
        state["import_dependency_pct"] = float(imp_dep)

        # append snapshot for this month (month index i+1)
        ts = {
            "month_index": i + 1,
            "global_price_usd_per_tonne": float(state["global_cpo_price_usd_per_tonne"]),
            "imports_tonnes": float(state["imports_tonnes"]),
            "landed_cost_inr_per_tonne": float(state["landed_cost_inr_per_tonne"]),
            "retail_price_inr_per_litre": float(state["retail_price_inr_per_litre"]),
            "farmer_market_price_inr_per_tonne": float(state["farmer_market_price_inr_per_tonne"]),
            "farmer_effective_price_inr_per_tonne": float(state["farmer_effective_price_inr_per_tonne"]),
            "government_revenue_inr": float(state["government_revenue_inr"]),
            "import_dependency_pct": float(state["import_dependency_pct"]),
            "cfpi_palm_contribution_pct": float(state.get("cfpi_palm_contribution_pct", 0.0)),
            "production_tonnes": float(state.get("production_tonnes", 0.0))
        }
        time_series.append(ts)

        # After snapshot, loop continues: new state becomes basis for next month
        # (any pending production multiplier was scheduled above and will be applied at the start of the next iteration)

    final_summary = time_series[-1] if time_series else {}
    return {"time_series": time_series, "final_summary": final_summary}
