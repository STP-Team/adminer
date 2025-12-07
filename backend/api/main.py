from fastapi import APIRouter

from backend.api.routes import achievements, auth, employees

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(employees.router)
api_router.include_router(achievements.router)
