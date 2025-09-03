from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from src.routes import records

app = FastAPI(title="API de Identificación de Emociones")

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(records.router, prefix="/records", tags=["records"])

@app.get("/")
def read_root():
    return {"mensaje": "Bienvenido a la API de emociones"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)