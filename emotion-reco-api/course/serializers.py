from rest_framework import serializers
from .models import Course
from professor.models import Professor
from professor.serializers import ProfessorSerializer

class CourseSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer(read_only=True)
        
    # Para POST: usar los IDs
    professor_id = serializers.PrimaryKeyRelatedField(
        queryset=Professor.objects.all(), source='professor', write_only=True
    )

    class Meta:
        model = Course
        fields = [
            "id", "name", "code",
            "professor",  # para GET
            "professor_id",  # para POST
        ]