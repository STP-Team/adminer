from fastapi import APIRouter

from app.api.routes import achievements, employees

api_router = APIRouter()
api_router.include_router(employees.router)
api_router.include_router(achievements.router)
