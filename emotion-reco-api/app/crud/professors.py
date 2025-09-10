from sqlalchemy.orm import Session
from app.models.professors import Professor
from app.schemas.professors import ProfessorCreate

def create_professor(db: Session, professor: ProfessorCreate):
    db_professor = Professor(**professor.dict())
    db.add(db_professor)
    db.commit()
    db.refresh(db_professor)
    return db_professor

def get_professors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Professor).offset(skip).limit(limit).all()

