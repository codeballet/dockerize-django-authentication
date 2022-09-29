import json
import re
from django.contrib.auth import authenticate, login, logout
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

def login_api(request):
    """Logs in users"""

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

    logout(request)

    return JsonResponse({
        "message": "Logged out"
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

        # ensure password matches confirmation
        if password != confirmation:
            return JsonResponse({
                "error": "Password fields not matching"
            }, status=406)
    except:
        return JsonResponse({
            "error": "No valid registration details"
        }, status=500)

    # Form validation
    non_alphanumeric = test_username(username)
    if non_alphanumeric:
        return JsonResponse({
            "error": "Username must be alphanumerical"
        }, status=406)

    valid_email = test_email(email)
    if not valid_email:
        return JsonResponse({
            "error": "Invalid email"
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
    result = True if pattern.fullmatch(email) else False
    return result

def test_username(username):
    """Detect if username has non-alphanumeric characters"""
    pattern = re.compile("\W")
    result = True if pattern.search(username) else False
    return result
