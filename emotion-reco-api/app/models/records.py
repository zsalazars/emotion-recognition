from sqlalchemy import Column, Integer, String, Float, DateTime
from app.models.base import Base

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    emotion = Column(String, index=True)
    accuracy = Column(Float, index=True)
    course = Column(String, index=True)
    course_id = Column(String, index=True)
    created_at = Column(String, index=True)