from sqlalchemy.orm import Session
from app.models.records import Record
from app.schemas.records import RecordCreate

def create_record(db: Session, record: RecordCreate):
    db_record = Record(**record.dict())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_records(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Record).offset(skip).limit(limit).all()

def get_record(db: Session, record_id: int):
    return db.query(Record).filter(Record.id == record_id).first()

def delete_record(db: Session, record_id: int):
    record = db.query(Record).filter(Record.id == record_id).first()
    if record:
        db.delete(record)
        db.commit()
        return True
    return False
