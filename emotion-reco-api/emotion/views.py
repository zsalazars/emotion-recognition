from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Emotion, EmotionRecord
from .serializers import EmotionSerializer, EmotionRecordSerializer

class EmotionViewSet(viewsets.ModelViewSet):
    queryset = Emotion.objects.all()
    serializer_class = EmotionSerializer

class EmotionRecordViewSet(viewsets.ModelViewSet):
    queryset = EmotionRecord.objects.all()
    serializer_class = EmotionRecordSerializer

    @action(detail=False, methods=['get'], url_path='by-student-course')
    def by_student_and_course(self, request):
        student_id = request.query_params.get("student_id")
        course_id = request.query_params.get("course_id")

        if not student_id or not course_id:
            return Response(
                {"error": "student_id y course_id son requeridos"},
                status=400
            )

        records = EmotionRecord.objects.filter(
            student_id=student_id,
            course_id=course_id
        ).order_by("-timestamp")

        serializer = EmotionRecordSerializer(records, many=True)
        return Response(serializer.data)
