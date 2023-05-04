from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.utils.translation import activate
from django.utils.translation import gettext as _
from django.http import JsonResponse
from .models import ClassesTest
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
    return render(request, 'login.html')


def logout_user(request):
    logout(request)
    messages.success(request, _("You have been log out"))
    return redirect('main_menu')


def register_user(request):
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


def database(request):
    data = ClassesTest.objects.all().values()
    data_list = list(data)
    return JsonResponse(data_list, safe=False)


def switch_language(request, language):
    activate(language)
    return redirect(request.META.get('HTTP_REFERER', '/'))
