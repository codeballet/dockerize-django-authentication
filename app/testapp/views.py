import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import User


@ensure_csrf_cookie
def index(request):
    return render(request, "testapp/index.html")


#######
# API #
#######

def login_api(request):
    return JsonResponse({
        "message": "Received login request"
    })

def logout_api(request):
    logout(request)
    return JsonResponse({
        "message": "Logged out."
    }, status=200)

def register_api(request):
    """Add registration to database"""
    if request.method != "POST":
        return JsonResponse({
            "error": "POST request required."
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
                "message": "Password fields not matching."
            }, status=406)
    except:
        return JsonResponse({
            "error": "Could not extract data from request."
        }, status=500)

    # create new user
    try:
        user = User.objects.create_user(username, email, password)
    except IntegrityError:
        return JsonResponse({
            "message": "Username already taken."
        }, status=409)

    # log in user
    try:
        login(request, user)
        return JsonResponse({
            "message": f"{username} is logged in."
        }, status=201)
    except:
        return JsonResponse({
            "message": "Failed to log in."
        }, status=500)