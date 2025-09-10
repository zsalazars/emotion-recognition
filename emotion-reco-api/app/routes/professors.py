from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
import app.crud.professors as crud
import app.schemas.professors as schemas
from typing import List

router = APIRouter()

@router.post("/", response_model=schemas.Professor)
def create_professor(professor: schemas.ProfessorCreate, db: Session = Depends(get_db)):
  return crud.create_professor(db=db, professor=professor)

@router.get("/", response_model=List[schemas.Professor])
def read_professors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
  return crud.get_professors(db, skip=skip, limit=limit)

