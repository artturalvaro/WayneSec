from fastapi import HTTPException
from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserLogin
from passlib.context import CryptContext
from utils.jwt_handler import create_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def register_user(db: Session, user_data: UserCreate):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado.")

    hashed_pw = get_password_hash(user_data.password)
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_pw,
        role=user_data.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def login_user(db: Session, login_data: UserLogin):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas.")

    token = create_token({"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}