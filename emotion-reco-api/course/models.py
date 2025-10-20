from django.db import models
from professor.models import Professor
from student.models import Student

class Course(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    code = models.CharField(max_length=20, unique=True, db_index=True)
    professor = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name="courses")
    students = models.ManyToManyField(Student, related_name="courses", blank=True)

    class Meta:
        db_table = "courses"

    def __str__(self):
        return self.name