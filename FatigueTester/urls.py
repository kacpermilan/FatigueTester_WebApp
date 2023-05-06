from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_menu, name='main_menu'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('start_tests/', views.start_tests, name='start_tests'),
    path('database/', views.display_userdata, name='database'),
    path('switch-language/<str:language>/', views.switch_language, name='switch_language'),
]
