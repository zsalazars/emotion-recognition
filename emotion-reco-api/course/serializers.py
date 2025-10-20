from rest_framework import serializers
from .models import Course
from professor.models import Professor
from professor.serializers import ProfessorSerializer
from student.models import Student
from student.serializers import StudentSerializer   

class CourseSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer(read_only=True)
    students = StudentSerializer(many=True, read_only=True)

    # Para POST: usar los IDs
    professor_id = serializers.PrimaryKeyRelatedField(
        queryset=Professor.objects.all(), source='professor', write_only=True
    )
    student_ids = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), many=True, source='students', write_only=True, required=False
    )

    class Meta:
        model = Course
        fields = [
            "id", "name", "code",
            "professor", "students",  # para GET
            "professor_id", "student_ids"  # para POST
        ]