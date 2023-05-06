from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.utils.translation import activate
from django.utils.translation import gettext as _
from .models import ClassesTest, SurveyResult
from .forms import RegisterForm


def main_menu(request):
    if request.method == 'POST':
        username = request.POST['email_field']
        password = request.POST['password_field']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, _("You have been logged in"))
            return redirect('main_menu')

        else:
            messages.success(request, _("There was an error logging in, please try again"))
            return redirect('login')

    return render(request, 'main_menu.html')


def login_user(request):
    if request.user.is_authenticated:
        messages.success(request, _("You are already logged in"))
        return redirect('main_menu')

    return render(request, 'login.html')


def logout_user(request):
    logout(request)
    messages.success(request, _("You have been log out"))
    return redirect('main_menu')


def register_user(request):
    if request.user.is_authenticated:
        messages.success(request, _("You are already logged in"))
        return redirect('main_menu')

    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            group = form.cleaned_data['account_type']
            group.user_set.add(user)

            # Auto-login after registration
            login(request, user)
            messages.success(request, _("You have been successfully registered"))
            return redirect('main_menu')

    form = RegisterForm()
    return render(request, 'register.html', {'form': form})


def start_tests(request):
    return render(request, 'tests_web.html')


def display_userdata(request):
    if not request.user.is_authenticated:
        messages.success(request, _("This section is available only for logged in users"))
        return redirect('login')

    classes_obj = ClassesTest.objects.all()
    return render(request, 'userdata.html', {'classes_obj': classes_obj})


def switch_language(request, language):
    activate(language)
    return redirect(request.META.get('HTTP_REFERER', '/'))
