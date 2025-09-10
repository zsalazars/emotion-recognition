from sqlalchemy import Column, Integer, String
from app.models.base import Base

class Professor(Base):
  __tablename__ = 'professors'
  
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, index=True)
  last_name = Column(String, index=True)
  department = Column(String, index=True)
