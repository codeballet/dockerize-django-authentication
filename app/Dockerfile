# base image
FROM python:3.10-slim-bullseye

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# update package manager and install packages
RUN apt-get update -y \
    && apt-get install -y vim

# install dependencies
WORKDIR /code
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . /code
