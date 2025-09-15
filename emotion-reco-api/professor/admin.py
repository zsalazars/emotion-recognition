# professor/admin.py
from django.contrib import admin
from .models import Professor

@admin.register(Professor)
class ProfessorAdmin(admin.ModelAdmin):
    list_display = ("id", "full_name", "user")
    search_fields = ("full_name", "user__username", "user__email")
    list_filter = ("user__is_active",)
    ordering = ("full_name",)
