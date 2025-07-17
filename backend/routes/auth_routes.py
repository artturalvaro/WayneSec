from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import UserCreate, UserLogin, UserOut
from models import User
from auth import register_user, login_user
from database import SessionLocal
from fastapi import Request, Response
from utils.auth_guard import get_current_user

router = APIRouter(tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)

@router.post("/login")
def login(login_data: UserLogin, request: Request, response: Response, db: Session = Depends(get_db)):
    return login_user(db, login_data, request, response)