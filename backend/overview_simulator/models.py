# backend/overview_simulator/models.py
from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class UserAction(BaseModel):
    tariff_pct: Optional[float] = None
    force_weather: Optional[Dict[str, str]] = None  # {"country": "Indonesia", "state": "BAD"}


class OverviewSimulateRequest(BaseModel):
    horizon: int
    actions: List[UserAction] = []
    seed: Optional[int] = None


class OverviewSimulateResponse(BaseModel):
    timeline: List[dict]


