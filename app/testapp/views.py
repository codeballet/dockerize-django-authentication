import json
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import User

# Single page view
@ensure_csrf_cookie
def index(request):
    return render(request, "testapp/index.html")


def login_view(request):
    pass
    # if request.method == "POST":
    #     # Attempt to sign user in
    #     username = request.POST["username"]
    #     password = request.POST["password"]
    #     user = authenticate(request, username=username, password=password)

    #     # Check if authentication successful
    #     if user is not None:
    #         login(request, user)
    #         return HttpResponseRedirect(reverse("index"))
    #     else:
    #         return render(request, )


def logout_view(request):
    pass

# API
def register_api(request):
    if request.method == "POST":
        return JsonResponse({
            "message": "Form submitted successfully!"
        }, status=200)