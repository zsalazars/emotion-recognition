from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "code", "professor")
    search_fields = ("name", "professor__full_name")
    list_filter = ("professor",)
    ordering = ("name",)
