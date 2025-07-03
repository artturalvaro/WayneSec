from fastapi import FastAPI
from routes.auth_routes import router as auth_router
import uvicorn

app = FastAPI(title="WayneSec API")
app.include_router(auth_router, prefix="/auth")

@app.get("/")
def main():
    return {"message": "WayneSec API funcionando"}

# Modo de testes
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)