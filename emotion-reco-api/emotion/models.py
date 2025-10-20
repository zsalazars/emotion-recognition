from django.db import models
from course.models import Course
from student.models import Student

class Emotion(models.Model):
    name = models.CharField(max_length=100, unique=True, db_index=True)

    class Meta:
        db_table = "emotions"

    def __str__(self):
        return self.name

class EmotionRecord(models.Model):
    emotion = models.ForeignKey(Emotion, on_delete=models.CASCADE, related_name="records")
    accuracy = models.FloatField(db_index=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="records")
    classroom_code = models.CharField(max_length=50, db_index=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
    student = models.ForeignKey(Student, null=True, on_delete=models.CASCADE, related_name="records")

    class Meta:
        db_table = "emotion_records"
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.emotion} ({self.accuracy}%) en {self.course}"
