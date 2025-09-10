from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.routes import records
from app.routes import professors
from app.core.database import engine
from app.models.base import Base

app = FastAPI(title="API de Identificación de Emociones")

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(records.router, prefix="/records", tags=["Records"])
api_router.include_router(professors.router, prefix="/professors", tags=["Professors"])

app.include_router(api_router) 

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

@app.on_event("startup")
def on_startup():
    # Create tables from database
    Base.metadata.create_all(bind=engine)