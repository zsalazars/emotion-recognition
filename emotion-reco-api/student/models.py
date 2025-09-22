from django.contrib.auth.models import User
from django.db import models

class Student(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)

    class Meta:
        db_table = "students"

    def __str__(self):
        return f"{self.code}: {self.name}"
