from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_menu, name='main_menu'),
    path('survey/', views.new_survey, name='survey'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('database/', views.display_userdata, name='database'),
    path('test/<int:pk>', views.survey_record, name='survey_display'),
    path('switch-language/<str:language>/', views.switch_language, name='switch_language'),
]
