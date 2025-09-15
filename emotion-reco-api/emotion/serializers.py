from rest_framework import serializers
from .models import Emotion, EmotionRecord

class EmotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emotion
        fields = "__all__"

class EmotionRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmotionRecord
        fields = "__all__"
