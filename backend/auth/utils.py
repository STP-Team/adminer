import hashlib
import hmac
from datetime import datetime, timedelta
from typing import Any

import jwt

from backend.core.config import settings


async def encode_jwt(
    payload: dict[str, Any],
    private_key: str = settings.auth_jwt.private_key_path.read_text(),
    algorithm: str = settings.auth_jwt.algorithm,
    expire_minutes: int = settings.auth_jwt.access_token_expire_minutes,
    expire_timedelta: timedelta | None = None,
):
    to_encode = payload.copy()

    now = datetime.utcnow()
    if expire_timedelta:
        expire = now + expire_timedelta
    else:
        expire = now + timedelta(minutes=expire_minutes)

    to_encode.update(exp=expire, iat=now)
    encoded = jwt.encode(payload=to_encode, key=private_key, algorithm=algorithm)

    return encoded


async def decode_jwt(
    token: str | bytes,
    public_key: str = settings.auth_jwt.public_key_path.read_text(),
    algorithm: str = settings.auth_jwt.algorithm,
):
    decoded = jwt.decode(jwt=token, key=public_key, algorithms=[algorithm])
    return decoded


def validate_telegram_auth(auth_data: dict[str, str], bot_token: str) -> bool:
    """Validate Telegram widget authentication data"""
    if not bot_token:
        return False

    check_hash = auth_data.get("hash")
    if not check_hash:
        return False

    # Remove hash from data for verification
    auth_data_copy = auth_data.copy()
    del auth_data_copy["hash"]

    # Create data string
    data_check_string = "\n".join(
        [f"{k}={v}" for k, v in sorted(auth_data_copy.items())]
    )

    # Create secret key
    secret_key = hashlib.sha256(bot_token.encode()).digest()

    # Calculate hash
    calculated_hash = hmac.new(
        secret_key, data_check_string.encode(), hashlib.sha256
    ).hexdigest()

    return calculated_hash == check_hash
