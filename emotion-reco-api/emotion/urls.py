from rest_framework import routers
from .views import EmotionViewSet, EmotionRecordViewSet

router = routers.DefaultRouter()
router.register(r"emotions", EmotionViewSet, basename="emotion")
router.register(r"emotion-records", EmotionRecordViewSet, basename="emotion-record")

urlpatterns = router.urls
