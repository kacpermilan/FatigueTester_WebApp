from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.main_menu, name='main_menu'),
    path('survey/', views.new_survey, name='survey'),
    path('user_profile/', views.display_user_profile, name='user_profile'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('database/', views.display_userdata, name='database'),
    path('database/patient/<str:username>', views.display_patientdata, name='patient'),
    path('switch-language/<str:language>/', views.switch_language, name='switch_language'),
    path('change-password/',
         auth_views.PasswordChangeView.as_view(template_name='user_change_password.html'),
         name='change_password'),
    path('change-password/done/',
         auth_views.PasswordChangeDoneView.as_view(template_name='user_password_change_done.html'),
         name='password_change_done'),
]
