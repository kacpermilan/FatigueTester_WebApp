from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


def main_menu(request):
    if request.method == 'POST':
        username = request.POST['email_field']
        password = request.POST['password_field']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "You have been logged in")
            return redirect('main_menu')

        else:
            messages.success(request, "There was an error logging in, please try again")
            return redirect('login')

    return render(request, 'main_menu.html')


def login_user(request):
    return render(request, 'login.html')


def logout_user(request):
    logout(request)
    messages.success(request, "You have been log out")
    return redirect('main_menu')

def start_tests(request):
    return render(request, 'tests_web.html')


def database(request):
    pass
