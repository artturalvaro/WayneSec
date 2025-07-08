from fastapi import HTTPException, status, Request, Response
from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserLogin
from passlib.hash import bcrypt as passlib_bcrypt
from utils.jwt_handler import create_token
from sqlalchemy.orm import Session
from datetime import timedelta
import time
import logging
import redis

r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)

login_attempts = {}
MAX_ATTEMPTS = 5
LOCKOUT_TIME = 300

logging.basicConfig(level=logging.DEBUG)

def get_password_hash(password):
    return passlib_bcrypt.hash(password)

def verify_password(plain, hashed):
    return passlib_bcrypt.verify(plain, hashed)

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

def login_user(db: Session, login_data: UserLogin, request: Request, response: Response):
    ip = request.client.host
    now = time.time()

    try:
        attempts = login_attempts.get(ip)

        if attempts:
            if now - attempts["last_attempt"] > LOCKOUT_TIME:
                login_attempts[ip] = {"count": 0, "last_attempt": now}
            elif attempts["count"] >= MAX_ATTEMPTS:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Muitas tentativas. Tente novamente em alguns minutos."
                )
        else:
            login_attempts[ip] = {"count": 0, "last_attempt": now}

        user = db.query(User).filter(User.email == login_data.email).first()

        if not user or not verify_password(login_data.password, user.password):
            login_attempts[ip]["count"] += 1
            login_attempts[ip]["last_attempt"] = now
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciais inválidas."
            )

        token = create_token({"sub": user.email, "role": user.role})
        login_attempts.pop(ip, None)
        
        return {"access_token": token, "token_type": "bearer"}

    except HTTPException as e:
        logging.error(f"HTTPException: {e.detail}")
        raise e

    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao processar a requisição"
        )