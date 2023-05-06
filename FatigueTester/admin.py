from django.contrib import admin
from .models import SurveyResult, PatientModel

# Register your models here.
admin.site.register(SurveyResult)
admin.site.register(PatientModel)
