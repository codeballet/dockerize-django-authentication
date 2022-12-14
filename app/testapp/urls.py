from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.index, name='index'),
    path('register', views.index, name='register'),
    path('login', views.index, name='login'),
    path('about', views.index, name='about'),

    path('api/home_loggedin', views.home_loggedin_api, name='home_loggedin_api'),
    path('api/login', views.login_api, name='login_api'),
    path('api/logout', views.logout_api, name='logout_api'),
    path('api/question', views.question_api, name='question_api'),
    path('api/register', views.register_api, name='register_api')
]
