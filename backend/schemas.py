from pydantic import BaseModel, EmailStr
from typing import Literal

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Literal["funcionario", "gerente", "admin"]

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str

    model_config = {
        "from_attributes": True
    }