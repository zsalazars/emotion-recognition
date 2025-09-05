from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base import Base
from app.models.records import Record
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Get the database URL
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the DB engine
engine = create_engine(
    DATABASE_URL, 
    echo=True,  # Enable the Sql query logging
    pool_pre_ping=True  # Check the connection is alive
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
Base.metadata.create_all(bind=engine)