import json
from django.contrib.auth import authenticate, login, logout
from django.http.response import JsonResponse
from django.shortcuts import render

from .models import User

# Single page view
def index(request):
    return render(request, "testapp/index.html")


def login_view(request):
    pass


def logout_view(request):
    pass


def register(request):
    return render(request, "testapp/register.html")

# API
