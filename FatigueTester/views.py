import json
from django.http import JsonResponse, Http404
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.utils.translation import activate
from django.utils.translation import gettext as _
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt
from .models import TestResult, TestAnswer, SurveyResult, PatientModel
from .forms import RegisterForm, SurveyForm, RequestForm

# Authentication/redirecting to mm/error
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

# Get data/create test result, test answer/save to db/get response - success/error
@csrf_exempt
def store_test_data(request):
    if request.method == "POST":
        test_score = float(request.POST['test_score'])
        average_response_time = float(request.POST['average_response_time'])
        assessment = (request.POST['assessment'])
        type_one_data = json.loads(request.POST['type_one_data'])
        type_two_data = json.loads(request.POST['type_two_data'])

        test_result = TestResult(user=request.user, test_date=now(), test_score=test_score,
                                 average_response_time=average_response_time, assessment=assessment)
        test_result.save()

        for data in type_one_data:
            corectness = False
            if data['match'] == 1:
                corectness = True
            answer = TestAnswer(associated_test=test_result,
                                correctness=corectness,
                                response_time=data['timeElapsed'],
                                type=1)
            answer.save()

        for data in type_two_data:
            corectness = False
            if data['match'] == 1:
                corectness = True
            answer = TestAnswer(associated_test=test_result,
                                correctness=corectness,
                                response_time=data['timeElapsed'],
                                type=2)
            answer.save()

        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "error"})

# Check if logged/check content/save survey results/ redirect to mm
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

    tests_data = TestResult.objects.filter(user_id=request.user)
    surveys_data = SurveyResult.objects.filter(user_id=request.user)
    patient_data = PatientModel.objects.filter(user_id=request.user, status='ACCEPTED')

    for test in tests_data:
        test.assessment = _(test.assessment)

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
        raise Http404(_("User not found."))

    patients = PatientModel.objects.filter(user_id=request.user, status='ACCEPTED')
    for patient in patients:
        if patient.patient.id == user_id:
            tests_data = TestResult.objects.filter(user_id=user_id)
            surveys_data = SurveyResult.objects.filter(user_id=user_id)

            for test in tests_data:
                test.assessment = _(test.assessment)

            return render(request, 'user_data.html', {'tests_data': tests_data, 'surveys_data': surveys_data,
                                                      'patient_username': username})

    messages.success(request, _("You don't have access to this Patient"))
    return redirect('database')


def display_test_result(request, test_id):
    if not request.user.is_authenticated:
        messages.success(request, _("This section is available only for logged in users"))
        return redirect('login')

    test_date = TestResult.objects.filter(id=test_id)[0].test_date
    test_answer_data = TestAnswer.objects.filter(associated_test_id=test_id)
    correctness_one = []
    response_times_one = []
    correctness_two = []
    response_times_two = []

    for record in test_answer_data:
        if record.type == 1:
            correctness_one.append(record.correctness)
            response_times_one.append(record.response_time)
        else:
            correctness_two.append(record.correctness)
            response_times_two.append(record.response_time)

    return render(request, 'test_record.html', {'test_answers': test_answer_data,
                                                'test_date': test_date,
                                                'correctness_one': correctness_one,
                                                'response_times_one': response_times_one,
                                                'correctness_two': correctness_two,
                                                'response_times_two': response_times_two})


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
