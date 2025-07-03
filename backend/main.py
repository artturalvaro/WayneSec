from fastapi import FastAPI
import uvicorn

app = FastAPI(title="WayneSec API")

@app.get("/")
def main():
    return {"message": "WayneSec API funcionando"}

# Modo de testes
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)