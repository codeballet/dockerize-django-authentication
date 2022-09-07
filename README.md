# Introduction to Dockerize Django: Authentication

This is a test app to explore how to use authentication for a Django webapp, running on Docker.

The aim is for the app to be production ready, using the following components:

- Gunicorn as production server.
- Nginx as proxy-server.
- Postgres as database.
- Certbot with Let's Encrypt for HTTPS encryption.

## Start a new Django project

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

After having created the initial project directory structure, with the `Dockerfile` and `docker-compose.yml` files, start a new project called "project" with command:

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

## Start a new app

To start a new app called "testapp":

```
docker compose exec web python manage.py startapp testapp
```

Remember to change the ownership of the files created by the Docker containers, as described above.

## Database migrations

To manually apply migrations on a running container:

```
docker compose exec web python manage.py migrate --no-input
```

## Sources

Here are some of the key sources used for the development of the app.

### [Quickstart: Compose and Django](https://docs.docker.com/samples/django/)

Basic information on how to set up Django and Postgres on Docker, with everything running in Docker.

### [Dockerizing Django with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)

A rather in-depth guide on how to use Gunicorn as a Django wsgi server for production, with Nginx as a proxy-server, everthing running on Docker.

### [Dimple Django deployment: a guide](https://mattsegal.dev/simple-django-deployment.html)

Lots of helpful detail on Django deployment. However, this guide does not use Docker.

## Articles for further research and development

- [How to backup and restore a Postgres database](https://mattsegal.dev/postgres-backup-and-restore.html)
- [How to automate your Postgres database backups](https://mattsegal.dev/postgres-backup-automate.html)
