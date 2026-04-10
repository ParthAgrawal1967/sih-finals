# backend/simulation/utils.py
import math

def apply_pending_production_update(state: dict):
    """
    Apply any pending production multiplier (delayed effect), then reset it to 1.0.
    Returns updated production value.
    """
    if "_pending_production_multiplier" in state:
        m = float(state.get("_pending_production_multiplier", 1.0))
        state["production_tonnes"] = float(state.get("production_tonnes", 0.0)) * m
        state["_pending_production_multiplier"] = 1.0
    return state

def safe_div(a, b, default=0.0):
    try:
        return a / b
    except Exception:
        return default

def clip(v, lo=None, hi=None):
    if lo is not None and v < lo:
        return lo
    if hi is not None and v > hi:
        return hi
    return v

def month_name_from_index(start_month, i):
    """
    Helper if needed to convert to human month; unused in engine but provided.
    """
    # start_month 1-12
    m = ((start_month - 1 + i) % 12) + 1
    return m
