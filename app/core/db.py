from stp_database import create_engine

from app.core.config import settings

engine = create_engine(
    host=settings.DB_HOST,
    port=settings.DB_PORT,
    username=settings.DB_USER,
    password=settings.DB_PASS,
    db_name=settings.DB_NAME,
)
