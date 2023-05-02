from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_menu, name='main_menu'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('start_tests/', views.start_tests, name='start_tests'),
    path('database/', views.database, name='database'),
]
