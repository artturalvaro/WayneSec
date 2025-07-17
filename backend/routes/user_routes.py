from fastapi import APIRouter, Depends
from utils.auth_guard import get_current_user
from models import User
from schemas import UserOut

router = APIRouter()

@router.get("/me", response_model=UserOut)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user