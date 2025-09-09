from sqlalchemy import Column, Integer, String


class Courses:
  __tablename__ = 'courses'
  
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, index=True)
  code = Column(String, index=True)