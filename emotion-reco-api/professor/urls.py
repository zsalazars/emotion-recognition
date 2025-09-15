from rest_framework import routers
from .views import ProfessorViewSet

router = routers.DefaultRouter()
router.register(r"professors", ProfessorViewSet, basename="professor")

urlpatterns = router.urls
