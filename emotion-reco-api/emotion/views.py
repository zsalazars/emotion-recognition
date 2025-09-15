from rest_framework import viewsets
from .models import Emotion, EmotionRecord
from .serializers import EmotionSerializer, EmotionRecordSerializer

class EmotionViewSet(viewsets.ModelViewSet):
    queryset = Emotion.objects.all()
    serializer_class = EmotionSerializer

class EmotionRecordViewSet(viewsets.ModelViewSet):
    queryset = EmotionRecord.objects.all()
    serializer_class = EmotionRecordSerializer
