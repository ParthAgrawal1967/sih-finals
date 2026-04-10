# backend/simulation/constants.py
"""
Fixed constants and policy rule parameters used by the scenario simulators.
These follow the non-negotiable rules you specified.
"""

# Subsidy weighting (fixed)
SUBSIDY_WEIGHTS = {
    "weather": 0.70,   # 70% weight on weather
    "area": 0.30       # 30% weight on area
}

# Production responsiveness factor (alpha) default: small responsiveness (0.12)
# The engine callers may override per-scenario via scenario_parameters.
DEFAULT_ALPHA = 0.12

# A small default responsiveness of imports/production to political shocks (psi)
DEFAULT_PSI = 0.15

# Political shock mapping defaults
POLITICAL_SHOCK_EFFECTS = {
    # multiplier on global price or tariff if export ban or sanction occurs
    "export_ban_price_multiplier": 0.05,     # 5% upwards immediate
    "tariff_delta_on_policy": 5.0,           # tariff points if policy requires
    "imports_reduction_factor": 0.10         # imports reduction factor if import restriction applied
}

# Scaling used to draw ascii mini-charts (not used by engine but handy)
ASCII_BAR_SCALE = 50
