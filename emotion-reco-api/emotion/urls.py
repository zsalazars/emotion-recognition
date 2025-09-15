from rest_framework import routers
from .views import EmotionViewSet, EmotionRecordViewSet

router = routers.DefaultRouter()
router.register(r"emotion", EmotionViewSet, basename="emotion")
router.register(r"emotion-records", EmotionRecordViewSet, basename="emotion-record")

urlpatterns = router.urls
