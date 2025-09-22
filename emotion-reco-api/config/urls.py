
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

preffix = "api/v1/"

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{preffix}token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(f'{preffix}token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(preffix, include("accounts.urls")),
    path(preffix, include("course.urls")),
    path(preffix, include("professor.urls")),
    path(preffix, include("student.urls")),
    path(preffix, include("emotion.urls")),
]
