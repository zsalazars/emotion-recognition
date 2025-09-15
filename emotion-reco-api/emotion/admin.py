from django.contrib import admin
from .models import Emotion, EmotionRecord

@admin.register(Emotion)
class EmotionAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
    ordering = ("name",)

@admin.register(EmotionRecord)
class EmotionRecordAdmin(admin.ModelAdmin):
    list_display = ("emotion", "accuracy", "course", "classroom_code", "timestamp")
    list_filter = ("emotion", "course", "timestamp")
    search_fields = ("emotion", "course", "classroom_code")
