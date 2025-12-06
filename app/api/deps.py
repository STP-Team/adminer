from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from stp_database import create_session_pool
from stp_database.repo.STP import MainRequestsRepo

from app.core.db import engine

session_pool = create_session_pool(engine)


async def get_session():
    async with session_pool() as session:
        yield session


async def get_repo():
    async with session_pool() as session:
        yield MainRequestsRepo(session)


SessionDep = Annotated[AsyncSession, Depends(get_session)]
RepoDep = Annotated[MainRequestsRepo, Depends(get_repo)]
