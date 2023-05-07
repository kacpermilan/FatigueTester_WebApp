import django.http
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.utils.translation import activate
from django.utils.translation import gettext as _
from django.utils.timezone import now
from .models import SurveyResult, PatientModel
from .forms import RegisterForm, SurveyForm, RequestForm


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

    # tests_data = TestResult.objects.filter(user_id=request.user)
    tests_data = None
    surveys_data = SurveyResult.objects.filter(user_id=request.user)
    patient_data = PatientModel.objects.filter(user_id=request.user, status='ACCEPTED')

    request_form = RequestForm(request.POST or None)
    if request.method == "POST":
        if request_form.is_valid():
            invitation = request_form.save(commit=False)
            invitation.user = request.user

            if invitation.patient.groups.filter(name="Supervisor").exists():
                messages.success(request, _("Supervisor cannot become patient"))
                return redirect('database')

            if PatientModel.objects.filter(user=invitation.user, patient=invitation.patient).exists():
                messages.success(request, _("User is already your patient or a request is pending"))
                return redirect('database')

            invitation.status = 'PENDING'
            invitation.created_at = now()
            invitation.save()

            messages.success(request, _("Invitation Send"))
            return redirect('database')

    return render(request, 'user_data.html', {'tests_data': tests_data, 'surveys_data': surveys_data,
                                              'patient_data': patient_data, 'request_form': request_form})


def display_patientdata(request, username):
    if not request.user.is_authenticated:
        messages.success(request, _("This section is available only for logged in users"))
        return redirect('login')

    try:
        user = User.objects.get(username=username)
        user_id = user.id

    except User.DoesNotExist:
        raise django.http.Http404(_("User not found."))

    patients = PatientModel.objects.filter(user_id=request.user, status='ACCEPTED')
    for patient in patients:
        if patient.patient.id == user_id:
            # tests_data = TestResult.objects.filter(user_id=pk)
            tests_data = None
            surveys_data = SurveyResult.objects.filter(user_id=user_id)
            return render(request, 'user_data.html', {'tests_data': tests_data, 'surveys_data': surveys_data,
                                                      'patient_username': username})

    messages.success(request, _("You don't have access to this Patient"))
    return redirect('database')


def supervisors_and_invitations(request):
    pending_invitations = PatientModel.objects.filter(patient=request.user,
                                                      status='PENDING')
    supervisors = PatientModel.objects.filter(patient=request.user,
                                              status='ACCEPTED')
    return render(request, 'user_supervisors_and_invitations.html', {'pending_invitations': pending_invitations,
                                                                     'supervisors': supervisors})


def accept_invitation(request, invite_id):
    invite = get_object_or_404(PatientModel, id=invite_id, patient=request.user, status='PENDING')

    invite.status = 'ACCEPTED'
    invite.save()
    messages.success(request, _("Invitation accepted."))

    return redirect('supervisors_and_invitations')


def decline_invitation(request, invite_id):
    invite = get_object_or_404(PatientModel, id=invite_id, patient=request.user, status='PENDING')

    invite.delete()
    messages.success(request, _("Invitation declined."))

    return redirect('supervisors_and_invitations')


def remove_supervisor(request, invite_id):
    invite = get_object_or_404(PatientModel, id=invite_id, patient=request.user, status='ACCEPTED')

    invite.delete()
    messages.success(request, _("Supervisor Removed."))

    return redirect('supervisors_and_invitations')


def switch_language(request, language):
    activate(language)
    return redirect(request.META.get('HTTP_REFERER', '/'))
