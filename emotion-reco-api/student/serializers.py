from rest_framework import serializers
from .models import Student
from course.models import Course

class SimpleCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "name", "code"]


class StudentSerializer(serializers.ModelSerializer):
    courses = SimpleCourseSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = [
            "id", "code", "name",
            "courses"
        ]
