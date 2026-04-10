# backend/simulation/state.py
from copy import deepcopy

def make_initial_state(base_row: dict, global_price: float):
    """
    Construct a state dict from last India baseline row and an initial global price.
    base_row: a pandas Series or dict-like with keys used in INDIAN_FEATURE_TEMPLATE
    global_price: scalar USD/tonne
    """
    s = {
        "global_cpo_price_usd_per_tonne": float(global_price),
        "imports_tonnes": float(base_row.get("imports_tonnes", base_row.get("imports_tonnes_lag1", 0.0))),
        "landed_cost_inr_per_tonne": float(base_row.get("landed_cost_inr_per_tonne", 0.0)),
        "retail_price_inr_per_litre": float(base_row.get("retail_price_inr_per_litre", 0.0)),
        "farmer_market_price_inr_per_tonne": float(base_row.get("farmer_price_inr_per_tonne", base_row.get("farmer_market_price_inr_per_tonne", 0.0))),
        "farmer_effective_price_inr_per_tonne": float(base_row.get("farmer_price_inr_per_tonne", base_row.get("farmer_market_price_inr_per_tonne", 0.0))),
        "government_revenue_inr": float(base_row.get("government_revenue_inr", 0.0)),
        "import_dependency_pct": float(base_row.get("import_dependency_pct", 0.0)),
        "cfpi_palm_contribution_pct": float(base_row.get("cfpi_palm_contribution_pct", 0.0)),
        # production (tonnes) - optional if baseline row has it
        "production_tonnes": float(base_row.get("domestic_production_tonnes", base_row.get("production_tonnes", 0.0))),
        # keep some bookkeeping
        "tariff_pct": float(base_row.get("tariff_pct", 0.0)),
        # pending effects: used to apply delayed responses (e.g. production changes next month)
        "_pending_production_multiplier": 1.0,
        "_meta": {
            "month_index": int(base_row.get("month", 0))
        }
    }
    return s

def clone_state(s: dict):
    return deepcopy(s)
