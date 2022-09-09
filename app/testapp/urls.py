from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.index, name='index'),
    path('register', views.index, name='register'),
    path('login', views.login_view, name='login'),
    path('api/logout', views.logout_api, name='logout_api'),
    path('api/register', views.register_api, name='register_api')
]
