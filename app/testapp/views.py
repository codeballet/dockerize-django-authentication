import json
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
            "error": "Could not acquire data from request"
        }, status=500)

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
            "error": "Could not acquire data from request"
        }, status=500)

    # create new user
    try:
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