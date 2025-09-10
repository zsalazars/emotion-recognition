from pydantic import BaseModel

class ProfessorBase(BaseModel):
  name: str
  last_name: str
  department: str

class ProfessorCreate(ProfessorBase):
  pass

class Professor(ProfessorBase):
  id: int

  class Config:
    orm_mode = True