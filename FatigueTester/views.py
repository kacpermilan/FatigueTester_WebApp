from django.shortcuts import render


def main_menu(request):
    return render(request, 'main_menu.html')


def login_user(request):
    pass


def logout_user(request):
    pass


def start_tests(request):
    return render(request, 'tests_web.html')


def database(request):
    pass


def login(request):
    pass
