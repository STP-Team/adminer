from fastapi import APIRouter, Depends
from stp_database.repo.STP import MainRequestsRepo

from app.core.dependencies import get_repo

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("/")
async def get_employees(repo: MainRequestsRepo = Depends(get_repo)):
    employees = await repo.employee.get_users()

    if not employees:
        return {"error": "Not found"}

    return {"employees": employees}


@router.get("/{user_id}")
async def get_user(
    user_id: int,
    repo: MainRequestsRepo = Depends(get_repo),
):
    employee = await repo.employee.get_users(user_id=user_id)

    if not employee:
        return {"error": "Not found"}

    return {
        "fullname": employee.fullname,
        "username": employee.username,
    }
