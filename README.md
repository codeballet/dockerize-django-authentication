## Ownership of files created inside containers

If you are running Docker on Linux, the files django-admin created are owned by root. This happens because the container runs as the root user. Change the ownership of the new files.

In case you use a data folder for a database, do not change the permission of the data folder where the database has its file, otherwise the database will not be able to start due to permission issues.

```
sudo chown -R $USER:$USER composeexample manage.py
```

## Sources

[Quickstart: Compose and Django](https://docs.docker.com/samples/django/)
[Dockerizing Django with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)
