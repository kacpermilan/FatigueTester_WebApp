import django.utils.timezone

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.utils.translation import activate
from django.utils.translation import gettext as _
from django.utils.timezone import now
from .models import SurveyResult
from .forms import RegisterForm, SurveyForm


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

    return render(request, 'main.html')


def new_survey(request):
    if not request.user.is_authenticated:
        messages.success(request, _("This section is available only for logged in users"))
        return redirect('login')

    form = SurveyForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            add_survey = form.save(commit=False)
            add_survey.user = request.user
            add_survey.date = now()
            add_survey.save()
            messages.success(request, _("Thank you for your feedback!"))
            return redirect('main_menu')

    return render(request, 'survey_new.html', {'form': form})


def login_user(request):
    if request.user.is_authenticated:
        messages.success(request, _("You are already logged in"))
        return redirect('main_menu')

    return render(request, 'user_login.html')


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
    return render(request, 'user_register.html', {'form': form})


def display_user_profile(request):
    if not request.user.is_authenticated:
        messages.success(request, _("This section is available only for logged in users"))
        return redirect('login')

    return render(request, 'user_profile.html')


def display_userdata(request):
    if not request.user.is_authenticated:
        messages.success(request, _("This section is available only for logged in users"))
        return redirect('login')

    # tests_obj =
    surveys_data = SurveyResult.objects.filter(user_id=request.user)
    # patient_data =
    return render(request, 'user_data.html', {'surveys_data': surveys_data})


def survey_record(request, pk):
    if not request.user.is_authenticated:
        messages.success(request, _("This section is available only for logged in users"))
        return redirect('login')

    matching_record = SurveyResult.objects.get(id=pk)
    return render(request, 'test_record.html', {'survey_record': matching_record})


def switch_language(request, language):
    activate(language)
    return redirect(request.META.get('HTTP_REFERER', '/'))
