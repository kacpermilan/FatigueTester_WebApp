from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class SurveyResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField()
    rating = models.IntegerField()
    comment = models.TextField(blank=True, null=True)


class PatientModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='supervisor')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'patient')
