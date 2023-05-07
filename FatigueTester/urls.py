from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.main_menu, name='main_menu'),
    path('survey/', views.new_survey, name='survey'),
    path('user-profile/', views.display_user_profile, name='user_profile'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('database/', views.display_userdata, name='database'),
    path('database/test/<int:test_id>', views.display_test_result, name='display_test_result'),
    path('database/patient/<str:username>', views.display_patientdata, name='patient'),
    path('supervisors-and-invitations', views.supervisors_and_invitations, name='supervisors_and_invitations'),
    path('accept_invitation/<int:invite_id>/', views.accept_invitation, name='accept_invitation'),
    path('decline_invitation/<int:invite_id>/', views.decline_invitation, name='decline_invitation'),
    path('remove_supervisor/<int:invite_id>/', views.remove_supervisor, name='remove_supervisor'),
    path('switch-language/<str:language>/', views.switch_language, name='switch_language'),
    path('change-password/',
         auth_views.PasswordChangeView.as_view(template_name='user_change_password.html'),
         name='change_password'),
    path('change-password/done/',
         auth_views.PasswordChangeDoneView.as_view(template_name='user_password_change_done.html'),
         name='password_change_done'),
]
