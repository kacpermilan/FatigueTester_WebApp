from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class TestResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test_date = models.DateTimeField(auto_now_add=True)
    test_score = models.FloatField(default=0)
    average_response_time = models.PositiveBigIntegerField()


class TestAnswer(models.Model):
    test_result = models.ForeignKey(TestResult, on_delete=models.CASCADE)
    correctness = models.BooleanField()
    response_time = models.PositiveBigIntegerField()


class SurveyResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField()
    comment = models.TextField(blank=True, null=True)


class PatientModel(models.Model):
    INVITATION_STATUS = {
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
    }

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='supervisor')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient')
    status = models.CharField(max_length=10, choices=INVITATION_STATUS, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'patient')
