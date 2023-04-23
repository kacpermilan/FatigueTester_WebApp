from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def welcome(request):
    return render(request, 'main_menu.html')


def start_tests(request):
    return render(request, 'Tests_web.html')


def database(request):
    return HttpResponse('Database page')


def login(request):
    return HttpResponse('Login page')
