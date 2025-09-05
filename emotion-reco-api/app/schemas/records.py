from pydantic import BaseModel

class RecordBase(BaseModel):
    emotion: str
    accuracy: float
    course: str
    course_id: str
    created_at: str

class RecordCreate(RecordBase):
    pass

class Record(RecordBase):
    id: int

    class Config:
        orm_mode = True
