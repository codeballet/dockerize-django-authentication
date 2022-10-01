import json
import re
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import User


#########
# Views #
#########

@ensure_csrf_cookie
def index(request):
    return render(request, "testapp/index.html")


#######
# API #
#######

@login_required
def home_loggedin_api(request):
    return JsonResponse({
        "user": request.session['user']
    }, status=200)


def login_api(request):
    """Login users"""

    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)

    # Acquire form field values
    try:
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
    except:
        return JsonResponse({
            "error": "No valid login details"
        }, status=500)

    # Form validation
    non_alphanumeric = test_username(username)
    if non_alphanumeric:
        return JsonResponse({
            "error": "Username must be alphanumerical"
        }, status=406)

    # Attempt to authenticate user
    user = authenticate(request, username=username, password=password)

    # If authentication successful, sign in user
    if user is not None:
        login(request, user)
        
        # Store username in session as 'user'
        request.session['user'] = username

        return JsonResponse({
            "message": f"{user} logged in"
        }, status=200)
    else:
        return JsonResponse({
            "error": "Invalid username and/or password"
        }, status=406)


def logout_api(request):
    """Logs out users"""    
    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)
    
    # identify user to log out
    user_leaving = request.session["user"]

    logout(request)

    # Clear user from session
    try:
        del request.session["user"]
    except KeyError:
        pass

    return JsonResponse({
        "user": user_leaving,
        "message": f"{user_leaving} logged out"
    }, status=200)


def register_api(request):
    """Add registration to database"""

    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required"
        }, status=405)

    # acquire form field values
    try:
        data = json.loads(request.body)
        username = data["username"]
        email = data["email"]
        password = data["password"]
        confirmation = data["confirmation"]
    except:
        return JsonResponse({
            "error": "No valid registration details"
        }, status=500)

    # Form validation
    non_alphanumeric = test_username(username)
    if non_alphanumeric is not None:
        return JsonResponse({
            "error": "Username must be alphanumerical"
        }, status=406)

    valid_email = test_email(email)
    if valid_email is None:
        return JsonResponse({
            "error": "Invalid email"
        }, status=406)

    if password != confirmation:
        return JsonResponse({
            "error": "Password fields not matching"
        }, status=406)

    # create new user
    try:
        print('creating new user...')
        user = User.objects.create_user(username, email, password)
    except IntegrityError:
        return JsonResponse({
            "error": "Username already taken"
        }, status=409)

    # log in user
    try:
        login(request, user)
        return JsonResponse({
            "message": f"{username} is registered and logged in"
        }, status=201)
    except:
        return JsonResponse({
            "error": "Failed to log in"
        }, status=500)


####################
# Helper functions #
####################

def test_email(email):
    """Detect if email appears valid"""
    pattern = re.compile("^(\w+)@(\w+)(\.\w+)+$")
    return pattern.fullmatch(email)

def test_username(username):
    """Detect if username has non-alphanumeric characters"""
    pattern = re.compile("\W")
    return pattern.search(username)
