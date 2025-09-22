from rest_framework import serializers
from .models import Professor
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer

class ProfessorSerializer(serializers.ModelSerializer):
    # Para GET: devuelve el objeto completo
    user = UserSerializer(read_only=True)
    
    # Para POST: usar los IDs
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Professor
        fields = [
            "id", "full_name",
            "user",  # para GET
            "user_id"  # para POST
        ]