from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='main_menu'),
    path('start_tests/', views.start_tests, name='start_tests'),
    path('database/', views.database, name='database'),
    path('login/', views.login, name='login'),
]
