from django.db import migrations

def seed_emotions(apps, schema_editor):
    Emotion = apps.get_model("emotion", "Emotion")
    emotions = [
        'neutral', 'happiness', 'surprise', 'sadness',
        'anger', 'disgust', 'fear', 'contempt'
    ]
    for name in emotions:
        Emotion.objects.get_or_create(name=name)

def unseed_emotions(apps, schema_editor):
    Emotion = apps.get_model("emotion", "Emotion")
    emotions = [
        'neutral', 'happiness', 'surprise', 'sadness',
        'anger', 'disgust', 'fear', 'contempt'
    ]
    Emotion.objects.filter(name__in=emotions).delete()

class Migration(migrations.Migration):

    dependencies = [
        ("emotion", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_emotions, unseed_emotions),
    ]
