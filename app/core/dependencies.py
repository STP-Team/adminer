from fastapi import Request
from stp_database.repo.STP import MainRequestsRepo


def get_repo(request: Request) -> MainRequestsRepo:
    return request.state.repo
