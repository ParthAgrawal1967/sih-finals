# backend/simulation/scenarios.py
from .constants import SUBSIDY_WEIGHTS, DEFAULT_ALPHA, DEFAULT_PSI, POLITICAL_SHOCK_EFFECTS
from .utils import safe_div

def apply_subsidy_policy(state: dict, params: dict):
    """
    Apply subsidy allocation for THIS month (affects farmer effective price immediately,
    but production only changes with a delayed multiplier to be applied next month).
    Inputs:
      - state: current month state (dict)
      - params: {
          "TotalSubsidyBudget_t": float,
          "WeatherIndex_s": float OR dict (per-state) - for single-state scenario we expect scalar,
          "PalmArea_s": float,
          "Production_s_t": float,
          "alpha": optional (responsiveness)
        }
    For our single-state simplified engine we will treat 's' as the entire country unless
    frontend passes per-state details. We follow your deterministic rules.
    """
    total_budget = float(params.get("TotalSubsidyBudget_t", 0.0))
    # For simplicity: if caller passes a dict of states, we only support single-state mapping here.
    # We compute subsidy per tonne using the SubsidyScore for the given "state".
    weather_idx = params.get("WeatherIndex_s", params.get("WeatherIndex", 0.5))
    area_share = params.get("AreaShare", params.get("AreaShare_s", 1.0))
    production = float(params.get("Production_s_t", state.get("production_tonnes", 1.0)))

    weight_w = SUBSIDY_WEIGHTS["weather"]
    weight_a = SUBSIDY_WEIGHTS["area"]

    subsidy_score = weight_w * float(weather_idx) + weight_a * float(area_share)
    # If caller provides an overall sum of scores, we can't compute others; assume score used directly
    # For single-state use: allocate whole budget proportionally
    # (SumAllSubsidyScores assumed to be subsidy_score for single-state => receives full budget)
    state_subsidy = total_budget * 1.0 if subsidy_score == 0 else total_budget * (subsidy_score / subsidy_score)

    subsidy_per_tonne = safe_div(state_subsidy, production, default=0.0)

    # Farmer effective price = market price + subsidyPerTonne
    state["farmer_effective_price_inr_per_tonne"] = float(state.get("farmer_market_price_inr_per_tonne", 0.0)) + subsidy_per_tonne

    # Government fiscal burden increases immediately by state_subsidy
    state["government_revenue_inr"] = float(state.get("government_revenue_inr", 0.0)) - float(state_subsidy)

    # Schedule production response next month:
    alpha = float(params.get("alpha", DEFAULT_ALPHA))
    # production multiplier to apply next month
    market_price = float(state.get("farmer_market_price_inr_per_tonne", 0.0))
    eff_price = float(state.get("farmer_effective_price_inr_per_tonne", 0.0))
    if market_price > 0:
        production_multiplier = 1.0 + alpha * ((eff_price - market_price) / market_price)
    else:
        production_multiplier = 1.0

    state["_pending_production_multiplier"] = max(0.5, production_multiplier)  # clamp to avoid absurd jumps
    return state

def apply_weather_shock(state: dict, params: dict):
    """
    WeatherIndex ∈ [0,1] where 1 = extreme failure.
    Bad weather reduces production next month; good weather increases (depending on index).
    We implement: production(t+1) = production(t) * [1 + α * (0.5 - WeatherIndex)]
      - If WeatherIndex > 0.5 -> negative effect
      - α default from params or DEFAULT_ALPHA
    Also affects subsidy prioritization (handled in subsidy module).
    """
    weather_index = float(params.get("WeatherIndex", 0.5))
    alpha = float(params.get("alpha", DEFAULT_ALPHA))

    # immediate effect: no instant production change (delayed); schedule multiplier
    # formula (as in spec): Production_{t+1} = Production_t × [1 + α × (WeatherIndex_t − 0.5)]
    multiplier = 1.0 + alpha * (weather_index - 0.5)
    # clamp multiplier to reasonable range
    if multiplier < 0.5:
        multiplier = 0.5
    if multiplier > 1.5:
        multiplier = 1.5

    state["_pending_production_multiplier"] = multiplier
    return state

def apply_political_shock(state: dict, params: dict):
    """
    Political shocks modify tariffs, imports, and possibly global price.
    params may include:
      - export_ban: bool
      - tariff_delta: float
      - imports_limit_pct: float
    """
    export_ban = params.get("export_ban", False)
    tariff_delta = float(params.get("tariff_delta", 0.0))
    imports_limit_pct = float(params.get("imports_limit_pct", 0.0))

    # modify tariff immediately
    state["tariff_pct"] = float(state.get("tariff_pct", 0.0)) + tariff_delta

    # if export ban -> global price increases slightly
    if export_ban:
        mult = 1.0 + POLITICAL_SHOCK_EFFECTS.get("export_ban_price_multiplier", 0.05)
        state["global_cpo_price_usd_per_tonne"] = float(state.get("global_cpo_price_usd_per_tonne", 0.0)) * mult
        # imports may rise if domestic supply short; but that will be re-calculated by baseline import predictor
    # If imports_limit_pct > 0 reduce imports immediately by that fraction
    if imports_limit_pct > 0:
        state["imports_tonnes"] = float(state.get("imports_tonnes", 0.0)) * max(0.0, (1.0 - imports_limit_pct))

    return state

def apply_commodity_shock(state: dict, params: dict):
    """
    Commodity shock multiplies global CPO price for the next step.
    params:
       - shock_magnitude: e.g. 0.10 for +10% spike, or -0.05 for -5% fall
    """
    shock = float(params.get("shock_magnitude", 0.0))
    state["global_cpo_price_usd_per_tonne"] = float(state.get("global_cpo_price_usd_per_tonne", 0.0)) * (1.0 + shock)
    return state
