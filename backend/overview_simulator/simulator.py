# backend/overview_simulator/simulator.py

import random

TOP_PRODUCERS = ["Indonesia", "Malaysia", "Thailand", "Colombia", "Nigeria"]

WEATHER_STATES = ["GOOD", "NORMAL", "BAD"]
POLITICAL_STATES = ["STABLE", "UNSTABLE", "BAN"]
FREIGHT_STATES = ["NORMAL", "DISRUPTED"]

BASE_GLOBAL_CPO_PRICE = 950
BASE_GLOBAL_DEMAND = 78_000_000
BASE_INDIAN_DEMAND = 23_000_000

USD_INR = 84
TONNE_TO_KG = 1000
CPO_DENSITY = 0.91
CFPI_WEIGHT = 0.028535
SWS = 10
IGST = 5

BASE_DOMESTIC_PRODUCTION = 1_200_000
BASE_IMPORTS = 20_000_000


def initialize_state(seed=None):
    rng = random.Random(seed)

    state = {
        "month": 1,
        "global_price": BASE_GLOBAL_CPO_PRICE,
        "global_demand": BASE_GLOBAL_DEMAND,
        "freight_state": "NORMAL",
        "india": {
            "tariff_pct": 15,
            "imports": BASE_IMPORTS,
            "domestic_production": BASE_DOMESTIC_PRODUCTION,
            "retail_price": 135,
            "farmer_price": 95_000,
            "govt_revenue": 0,
            "subsidy": 0,
        },
        "countries": {},
    }

    for c in TOP_PRODUCERS:
        state["countries"][c] = {
            "production": rng.randint(8_000_000, 15_000_000),
            "export_share": rng.uniform(0.6, 0.9),
            "weather": rng.choice(WEATHER_STATES),
            "politics": "STABLE",
        }

    return state, rng


def weather_impact(w):
    return {"GOOD": 1.1, "NORMAL": 1.0, "BAD": 0.8}[w]


def political_impact(p):
    return {"STABLE": 1.0, "UNSTABLE": 0.7, "BAN": 0.0}[p]


def freight_multiplier(s):
    return 1.25 if s == "DISRUPTED" else 1.0


def compute_global_supply(state):
    supply = 0
    for c in TOP_PRODUCERS:
        country = state["countries"][c]
        supply += (
            country["production"]
            * country["export_share"]
            * weather_impact(country["weather"])
            * political_impact(country["politics"])
        )
    return supply


def update_global_price(state):
    supply = compute_global_supply(state)
    demand = state["global_demand"]

    ratio = supply / demand

    if ratio < 0.9:
        state["global_price"] *= 1.08
    elif ratio > 1.1:
        state["global_price"] *= 0.92

    if state["freight_state"] == "DISRUPTED":
        state["global_price"] *= 1.05


def apply_indian_trade(state):
    tariff = state["india"]["tariff_pct"]

    imports = BASE_IMPORTS * (100 / (100 + tariff))
    state["india"]["imports"] = imports

    cif = state["global_price"] * USD_INR * freight_multiplier(state["freight_state"])

    landed = cif * (1 + (tariff + SWS) / 100) * (1 + IGST / 100)

    retail = (landed / (TONNE_TO_KG * CPO_DENSITY)) * 1.18
    farmer_price = landed * 0.82
    govt_revenue = imports * (landed - cif)

    state["india"]["retail_price"] = retail
    state["india"]["farmer_price"] = farmer_price
    state["india"]["govt_revenue"] = govt_revenue


def apply_subsidy(state):
    penalty = 0.7 if state["countries"]["Indonesia"]["weather"] == "BAD" else 0
    subsidy = penalty * 5000 * state["india"]["domestic_production"]
    state["india"]["subsidy"] = subsidy


def apply_shocks(state, rng):
    if rng.random() < 0.2:
        state["freight_state"] = rng.choice(FREIGHT_STATES)

    for c in TOP_PRODUCERS:
        state["countries"][c]["weather"] = rng.choice(WEATHER_STATES)
        if rng.random() < 0.1:
            state["countries"][c]["politics"] = rng.choice(POLITICAL_STATES)


def compute_cfpi(state):
    inflation = ((state["india"]["retail_price"] - 130) / 130) * 100
    return inflation * CFPI_WEIGHT


def apply_user_action(state, action):
    if not action:
        return
    if "tariff_pct" in action and action["tariff_pct"] is not None:
        state["india"]["tariff_pct"] = action["tariff_pct"]
    if "force_weather" in action and action["force_weather"]:
        w = action["force_weather"]
        state["countries"][w["country"]]["weather"] = w["state"]


def step(state, action, rng):
    apply_user_action(state, action)
    apply_shocks(state, rng)
    update_global_price(state)
    apply_indian_trade(state)
    apply_subsidy(state)

    result = {
        "month": state["month"],
        "global_price_usd": round(state["global_price"], 2),
        "india_imports": int(state["india"]["imports"]),
        "india_retail_price": round(state["india"]["retail_price"], 2),
        "india_farmer_price": round(state["india"]["farmer_price"], 2),
        "govt_revenue": int(state["india"]["govt_revenue"]),
        "subsidy_paid": int(state["india"]["subsidy"]),
        "cfpi": round(compute_cfpi(state), 4),
        "freight": state["freight_state"],
    }

    state["month"] += 1
    return result


def run_simulation(horizon, actions, seed=None):
    state, rng = initialize_state(seed)
    timeline = []

    for i in range(horizon):
        action = actions[i] if i < len(actions) else {}
        timeline.append(step(state, action, rng))



    return timeline
