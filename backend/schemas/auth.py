from pydantic import BaseModel


class TokenInfo(BaseModel):
    access_token: str
    token_type: str


class UserInfo(BaseModel):
    user_id: int
    fullname: str
    role: int
    username: str | None = None
    division: str | None = None
    position: str | None = None

    class Config:
        from_attributes = True


class TelegramAuthData(BaseModel):
    id: str
    first_name: str
    last_name: str | None = None
    username: str | None = None
    photo_url: str | None = None
    auth_date: str
    hash: str
