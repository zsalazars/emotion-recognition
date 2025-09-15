
from django.contrib import admin
from django.urls import path, include

preffix = "api/v1/"

urlpatterns = [
    path('admin/', admin.site.urls),
    path(preffix, include("course.urls")),
    path(preffix, include("professor.urls")),
    path(preffix, include("emotion.urls")),
]
