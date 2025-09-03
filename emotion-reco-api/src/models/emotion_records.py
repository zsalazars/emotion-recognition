

class emotion_records(Base):
    __tablename__ = "emotion_records"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    emotion = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)