FROM debian:11.5-slim

# install packages
RUN apt-get update -y \
    && apt-get install -y wget tar

# install sass
WORKDIR /opt
RUN wget https://github.com/sass/dart-sass/releases/download/1.55.0/dart-sass-1.55.0-linux-x64.tar.gz
RUN tar -xvzf dart-sass-1.55.0-linux-x64.tar.gz

# set PATH environment variable
ENV PATH=/opt/dart-sass:$PATH

# copy local files to container
WORKDIR /styles
COPY ./testapp .

CMD [ "sass", "--watch", "styles.scss", "styles.css" ]
