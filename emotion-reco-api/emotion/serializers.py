from rest_framework import serializers
from .models import Emotion, EmotionRecord
from course.models import Course
from course.serializers import CourseSerializer

class EmotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emotion
        fields = "__all__"

class EmotionRecordSerializer(serializers.ModelSerializer):
    # Para GET: devuelve el objeto completo
    emotion = EmotionSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    
    # Para POST: usar los IDs
    emotion_id = serializers.PrimaryKeyRelatedField(
        queryset=Emotion.objects.all(), source='emotion', write_only=True
    )
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(), source='course', write_only=True
    )
    class Meta:
        model = EmotionRecord
        fields = [
            "id", "accuracy", "classroom_code", "timestamp",
            "emotion", "course",  # para GET
            "emotion_id", "course_id"  # para POST
        ]
