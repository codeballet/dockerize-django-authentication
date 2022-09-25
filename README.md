# Introduction to the Dockerize Django app

This is a test app to explore the development of a webapp based on Django, running on Docker.

The overall aim is for the app to be production ready, using the following components:

- A Singlepage frontend, programmed in Object Oriented JavaScript.
- SASS for styling.
- Django as the backend server
- Gunicorn as production server.
- Nginx as proxy-server.
- Postgres as database.
- Certbot with Let's Encrypt for HTTPS encryption.

## The Frontend: Modularity with vanilla JavaScript

The frontend is coded solely in JavaScript, using an object oriented approach. The aim is to keep the code modular and re-useable. Thus, there are some conceptual similarities to how React components work, while still keeping a strict separation between the JavaScript code and the CSS styling.

## Start a new Django project

Here are some brief instructions for how to get going with your own project.

Initial file structure:

```
.
├── README.md
├── app/
│   ├── Dockerfile
│   └── requirements.txt
├── .env.dev
├── .gitignore
├── docker-compose.yml
└── nginx/
```

After having created the initial project directory structure, with the `Dockerfile` and `docker-compose.yml` files: from the project root directory, start a new Django project called "project" with command:

```
docker-compose run web django-admin startproject project .
```

## Ownership of files created inside containers

If you are running Docker on Linux, the files django-admin created are owned by root. This happens because the container runs as the root user. Change the ownership of the new files.

In case you use a data folder for a database, do not change the permission of the data folder where the database has its file, otherwise the database will not be able to start due to permission issues.

```
sudo chown -R $USER:$USER ./app/project ./app/manage.py
```

## Test run the project

The Django project should now be possible to run with `docker compose up`.

## Database migrations

To create migrations:

```
docker compose exec web python manage.py makemigrations
```

To apply migrations:

```
docker compose exec web python manage.py migrate --no-input

```

## Start a new app

To start a new app called "testapp":

```
docker compose exec web python manage.py startapp testapp
```

As above for the project, remember to change the ownership of the files created by the Docker containers.

## Errors and troubleshoting

### ERROR -- Django auth.User.groups: (fields.E304) Reverse accessor for User.groups clashes with reverse

According to [DebugAH](https://debugah.com/django-auth-user-groups-fields-e304-reverse-accessor-for-user-groups-clashes-with-reverse-5735/), this is because a new AbstractUser user class conflicts with Django’s own user class.

Solution: Add a line of configuration in the `settings.py` file:

```
AUTH_USER_MODEL = 'testapp.User'  #  where testapp is the app name and User is the model class name
```

### Static css files directory
For some reason, it seems that the `/app/testapp/static/testapp/css` directory is not picked up by git. If so, add that manually.

## Sources

Here are some of the key sources used for the development of the app.

### [Quickstart: Compose and Django](https://docs.docker.com/samples/django/)

Basic information on how to set up Django and Postgres on Docker, with everything running in Docker.

### [Dockerizing Django with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)

A rather in-depth guide on how to use Gunicorn as a Django wsgi server for production, with Nginx as a proxy-server, everthing running on Docker.

### [Dimple Django deployment: a guide](https://mattsegal.dev/simple-django-deployment.html)

Lots of helpful detail on Django deployment. However, not using Docker.

## Articles for further research and development

- [How to backup and restore a Postgres database](https://mattsegal.dev/postgres-backup-and-restore.html)
- [How to automate your Postgres database backups](https://mattsegal.dev/postgres-backup-automate.html)
