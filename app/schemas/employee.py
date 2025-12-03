from pydantic import BaseModel


class EmployeeRead(BaseModel):
    id: int
    user_id: int | None
    username: str | None
    division: str | None
    position: str | None
    fullname: str
    head: str | None
    email: str | None
    role: int
    is_trainee: bool
    is_casino_allowed: bool
    is_exchange_banned: bool

    class Config:
        from_attributes = True


class EmployeeList(BaseModel):
    employees: list[EmployeeRead]
