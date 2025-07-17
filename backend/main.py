from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from routes.user_routes import router as user_router
import uvicorn

app = FastAPI(title="WayneSec API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(user_router)

@app.get("/")
def main():
    return {"message": "WayneSec API funcionando"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)