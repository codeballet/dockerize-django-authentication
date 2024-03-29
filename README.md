# Ask Me - an AI driven webapp

## Introduction to the Ask Me application

The Ask Me application is a research tool concept, created by Johan Stjernholm for the Space Engineering Arts Project.

Ask Me enables users to ask questions to an Artificial Intelligence, which looks for an answer by means of trying to match a given question to the content of a corpus of texts that the AI has read. The AI presents its answer in the form of a series of referenced quotes.

## Aims and Objectives

The main aim of Ask Me is to inspire researchers, scholars, and creative art practitioners to critically consider current trends concerning how various technologies and algorithms increasingly shape and influence creative practices and research within the creative arts, as well as the human and social sciences.

There are two key objectives: First, the publication on the Internet of this web application called Ask Me, serving to provide a practical example of how it is possible for creative practitioners, researchers, and scholars to make choices and selectively take charge of the use, and production, of digital tools and algorithms.

Secondly, to publish an article that outlines in more detail the importance of raising our awareness of how to engage with digital technologies, drawing on some recent theory regarding algorithms, big data, and Artificial Intelligence. That article will also more extensively explain the tools and technologies that underpinds the Ask Me web application.

## About Johan Stjernholm

Johan Stjernholm (PhD) is an acclaimed interdisciplinary artist, working as a Producer, Artistic Director, Choreographer, Composer, Fine Artist, Computer Scientist, and Author. Johan's artistic work has been performed and exhibited across Europe, Asia, and America.

## Features

Here are some of the interesting features about the application.

### Utilizing Django on the backend

The application backend is programmed in Django, using a database backend that enables users to to register and log in to the application.

### Utilizing JavaScript on the frontend

The frontend is written almost entirely in JavaScript, according to the singlepage paradigm. The JavaScript code outlines a new mode of modular single page webprogramming for Django, combining the strengths and security features of Django with the advantages of the single page paradigm.

### Mobile Responsive

The webpage is Mobile Responsive, partly because it is taking into account the viewport width of the user's device. The `<head></head>` of the webpage contains the following `<meta>` element:

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Additionally, the application is using Flexbox to wrap the navigation buttons according to the size of the display.

### Content and purpose

The application is an Artificial Intelligence driven site that can answer questions from a user, drawing on 'knowledge' from a corpus of documents that the AI has access to read.

### Docker

The application is entirely packaged in Docker containers. I use Docker Compose to make it easy to run and deliver the application across platforms in a consistent manner.

### Styling with SASS in a Docker container

I am using SASS for styling, which again goes beyond the criteria for all the previous course projects. Part of the challenge here was how to generate a Docker container that could dynamically generate CSS files to be available for the web application, running in a separate Docker container.

### A Class-based, modular JavaScript singlepage frontend paradigm

The design of the frontend with JavaScript not only according to the singlepage paradigm. It constitutes a rather novel and evolutionary approach to coding singlepage apps in JavaScript on the Django platform. I have not come across any other project and website that uses the specific approach I developed for this Ask Me application. Please do inform me if you know of anyone using a similar approach.

The approach I used was to try to create as much as possible of the site content as Classes and Objects in JavaScript. For instance, all the forms in the application are instances of one single Class called `InputForm`. Meanwhile, the unique fields of each form are stored as JavaScript Objects. In order to generate a new instance of a form, the form Object is passed into the `InputForm` class and appended to the relevant HTML element.

The advantage of the above described approach to forms is that it makes it very easy to generate new forms. The workflow is: Define a form Object, instantiate it with the generic `InputForm` class, and append it to the page.

In more general terms, the approach that I developed could be described as having a somewhat modular character. It may be loosely compared with the React framework: My JavaScript classes in some ways approximate the modular functionality of React components, but without having to use the JSX syntax. Instead, my approach consistently uses vanilla JavaScript.

One potential downside of my approach may be that the structure of the website becomes a bit more abstract and complex, as virtually no HTML is used at all. Almost everything on the page consists of JavaScript instances of modular Classes and Objects.

However, one of the advantages of the modular approach is that it makes it easier to track various states, and to modify the pages based on those states. In particular, I use two Classes: `UserState` and `BrowserState`. The former for keeping track of the state of the user, wether they are logged in and logged out, and the latter for keeping track of the website, as in which 'page' the user is on.

The `BrowserState` Class enables the navigation buttons to be dynamically coloured and responding to user interaction, depending on which page they are watching. The `UserState` class makes it possible to easily show or hide elements of the interface, depending on wether the user is logged in or logged out.

### Preparing for production

In the project, I have started to prepare the application for production. In particular, I have moved several of the configuration parameters to a `.env.dev` file, which later on may be complemented by a `.env.prod` file, once the project goes to production.

The planned `.env.prod` file will contain sensitive and secret materials, such as the Django `SECRET_KEY` variable, and the database password, and should hence be kept strictly private.

### Artificial Intelligence

Lastly, the standout feature of the application is its use of Artificial Intelligence. I use a Form on the webpage to acquire a question from the user. The question is sent with a `Fetch` request to the backend API on Django, processed by the AI, and the answer is then sent back to the frontend and displayed on the user's homepage.

As for the corpus that the AI draws its knowledge from, the text files are located inside the `testapp/static/testapp/corpus` directory. Originally, I have here included texts from Walt Whitman, Ralph Waldo Emerson, and the Gilgamesh Epic, which makes for some rather interesting answers. Please see the below "Additional Information" for details and acknowledgements. However, the corpus may vary according to future devlopments of the app.

## Files overview

### Docker files

The project has one `docker-compose.yml` file, which enables the entire application to be run with one `docker compose up` command. The `docker-compose.yml` file starts three services, two of which are defined by `Dockerfile` files: one for the web application and one for compiling the SASS files to standard CSS. The third service is a Postgres image pulled from the Docker hub.

### The `views.py` file

The `views.py`, this file contains the one view that activates the the one singlepage view. The file also contains the API of the server, as well as the AI functions.

### The `.gitignore` file

The `.gitignore` file most notably lists the `.env.prod` file, to be used for production settings of the application, and it should be kept private and secret.

### Inside the `testapp` directory

The `testapp` directory is where the main body of my files are. There is a `Dockerfile`, defining how to build and run the container of the Docker `web` service.

Inside the `testapp/templates/testapp/` directory, there is a single `index.html` file, serving as the basis for the singlepage frontend.

Inside the `testapp/static/testapp/` directory, there are three subdirectories:

- `corpus`
- `css`
- `js`

The `corpus` subdirectory contains the text files that the AI reads and generates its answers from

The `css` subdirectory is a directory for linking the `web` Docker service to the `styles` Docker service, which compiles the SASS files, as defined in the `docker-compose.yml` file. Note that the `css` directory is typically only populated inside the running Docker container of the `web` service itself, since the CSS files between the two services are linked by means of Docker bind-volumes. The `css` directory on the versioning repository is typically empty. However, in case that directory is missing, it seems to produce errors.

IMPORTANT NOTE:
For some reason, it appears that empty directoryies, such as the `/app/testapp/static/testapp/css` directory, are not picked up by the git versioning system, unless there is a file inside that directory. Hence, in order not to get errors due to a missing directory, I added the file `css/empty.txt`. That file serves no other purpuse than simply making sure that the `css` directory indeed is picked up by the git versioning system.

The `js` subdirectory is where all the JavaScript action is happening. Inside that directory is a bunch of files:

- `classes.js`, defining all the JavaScript Classes for the frontend.
- `eventHandlers.js`, providing all the event handlers for buttons, etc.
- `forms.js`, containing all the form Objects, used for instantiation of forms by means of the `InputForm` Class.
- `helperFunction.js` contains all the functions that are called by the event handlers and the `index.js` files.
- `index.js` contains the central JavaScript file that goes into action once the HTML content is initially loaded. This file acts as the 'director' that controls all the other JavaScript files.
- `objects.js` instantiates the classes in the above `classes.js` file, and defines some other JavaScript Objects as global variables.

### Inside the `styles` directory

There is a Dockerfile, specifying how to build the image and run the `styles` Docker service that does the job of compiling the SASS files to CSS. There is also a subdirectory called `testapp/`, which contains the `styles.scss` file and the compiled `styles.css` file.

The `styles/testapp/` directory acts as a Docker bind-volume both to the Docker `styles` and the `web` services, to make sure that the Docker `web` service gets access to the compiled `styles.css` file, as defined in the `docker-compose.yml` file.

## How to run the application

Since the appliation is packaged in Docker containers, you first need to have Docker installed and running.

From the same directory as where the `docker-compose.yml` file is, run the project with command:

```
docker compose up
```

You may add the flag `-d` to the above command in order to run the containers in a detached mode, getting your command prompt back. Otherwise, start up a new terminal window, `cd` to the same directory as above, and create migrations with:

```
docker compose exec web python manage.py makemigrations
```

Apply the migrations with:

```
docker compose exec web python manage.py migrate --no-input
```

At this point, the application should be up and running. Do note that unless you delete the volume created by Docker, you do not need to once again migrate the database next time you run `docker compose up`. The database is stored in a Docker volume called `postgres_data`.

## Additional information

Please note that the Artificial Intelligence used in this project is my own, original work, created as part of my final project "Questions" for the Harvard online course CS50's Introduction to Artificial Intelligence with Python. However, the AI is customized and modified for this particular project, for the purpose of integrating the AI with the web application.

When filling in the form to ask the AI a question, please be patient. I have not yet implemented any visual feedback while the AI is processing the answers. Please just be aware that depending on the speed of the server, the answer will take some time to generate before it appears on the webpage.

### Acknowledgements

The content of the Corpus is sourced from:

- https://www.poetryfoundation.org/poems/45477/song-of-myself-1892-version
- https://www.thefreshreads.com/self-reliance/
- http://www.ancienttexts.org/library/mesopotamian/gilgamesh/
