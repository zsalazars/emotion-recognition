from django.contrib.auth.models import User
from django.db import models

class Professor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="professor_profile")
    full_name = models.CharField(max_length=200)

    class Meta:
        db_table = "professors"

    def __str__(self):
        return self.full_name