from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
import app.crud.records as crud
import app.schemas.records as schemas
from typing import List

router = APIRouter()

@router.post("/", response_model=schemas.Record)
def create_record(record: schemas.RecordCreate, db: Session = Depends(get_db)):
    return crud.create_record(db=db, record=record)

@router.get("/", response_model=List[schemas.Record])
def read_records(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_records(db, skip=skip, limit=limit)

@router.get("/{record_id}", response_model=schemas.Record)
def read_record(record_id: int, db: Session = Depends(get_db)):
    db_record = crud.get_record(db, record_id=record_id)
    if not db_record:
        raise HTTPException(status_code=404, detail="Record not found")
    return db_record

@router.delete("/{record_id}")
def delete_record(record_id: int, db: Session = Depends(get_db)):
    success = crud.delete_record(db, record_id)
    if not success:
        raise HTTPException(status_code=404, detail="Record not found")
    return {"message": "Record deleted successfully"}
