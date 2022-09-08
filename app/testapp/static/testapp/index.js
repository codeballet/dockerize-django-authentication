////////////////////////
// Form input objects //
////////////////////////

const registerFormInput = {
    given_name: {
        id: 'register_given_name',
        classname: 'form_field',
        name: 'register_given_name',
        type: 'text',
        placeholder: 'Given name'
    },
    family_name: {
        id: 'register_family_name',
        classname: 'form_field',
        name: 'register_family_name',
        type: 'text',
        placeholder: 'Family name'
    },
    email: {
        id: 'register_email',
        classname: 'form_field',
        name: 'register_email',
        type: 'text',
        placeholder: 'Email'
    },
    submit: {
        id: 'register_submit',
        classname: 'button',
        type: 'submit'
    }
}

//////////////////
// Page Objects //
//////////////////

// Form object
const InputForm = function(input, appendTo, id, classname) {
    this.input = input;
    this.appendTo = appendTo;
    this.id = id;
    this.classname = classname;

    // Create and append form element
    const form = document.createElement('form')
    form.id = this.id;
    form.className = this.classname;
    document.querySelector(`#${this.appendTo}`).append(form);

    // Generate the form inputs
    for (const [key, value] of Object.entries(this.input)) {
        // for each form input
        const field = document.createElement('input');
        for (const [k, v] of Object.entries(value)) {
            // set form input values
            if (k === 'id') { field.id = v; }
            if (k === 'classname') { field.className = v }
            if (k === 'name') { field.name = v; }
            if (k === 'type') { field.type = v; }
            if (k === 'placeholder') { field.placeholder = v; }
        }
        // append inputs to form
        document.querySelector(`#${this.id}`).append(field);
    }

}


// Home page object
const HomePage = function (id = 'home_page', className = 'page') {
    this.id = id;
    this.className = className;

    const div = document.createElement('div');
    div.id = this.id;
    div.className = this.className;

    div.innerHTML = 'This is the homepage';

    document.querySelector('.container').append(div);
    document.querySelector(`#${this.id}`).style.display = 'none';
}

HomePage.prototype.hide = function() {
    document.querySelector(`#${this.id}`).style.display = 'none';
}

HomePage.prototype.show = function() {
    document.querySelector(`#${this.id}`).style.display = 'Block';
}


// Navigation button object
const NavButton = function(innerHtml, id, className = 'nav_button button') {
    this.innerHtml = innerHtml;
    this.id = id;
    this.classname = className;

    // create and append nav button
    const navButton = document.createElement('button');
    navButton.id = this.id;
    navButton.className = this.classname;
    navButton.innerHTML = this.innerHtml;
    document.querySelector('#nav').append(navButton);
}


// Navigation menu object
const NavMenu = function(id = 'nav', className = 'page') {
    this.id = id;
    this.className = className

    const div = document.createElement('div');
    div.id = this.id
    div.className = this.className
    
    document.querySelector('.container').append(div);
}


// Register page object
const RegisterPage = function(id = 'register_page', className = 'page') {
    this.id = id;
    this.className = className;

    const div = document.createElement('div');
    div.id = this.id;
    div.className = this.className;

    div.innerHTML = 'This is the Register page';

    document.querySelector('.container').append(div);
    document.querySelector(`#${this.id}`).style.display = 'none';
}

RegisterPage.prototype.hide = function() {
    document.querySelector(`#${this.id}`).style.display = 'none';
}

RegisterPage.prototype.show = function() {
    document.querySelector(`#${this.id}`).style.display = 'Block';
}


///////////////////
// State Objects //
///////////////////

// Browser history state object
function BrowserHistory(page = '') {
    this.page = page
}

BrowserHistory.prototype.setPage = function(page) {
    this.page = page;
    history.pushState({page: this.page}, "", this.page);
}

BrowserHistory.prototype.getPage = function() {
    // gets last part of current url
    const url = window.location.href;
    const url_list = url.split('/');
    this.page = url_list[url_list.length -1];
    return this.page
}


////////////////////////
// DOM Content Loaded //
////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // check localStorage for lastState
    let lastState = '';
    if (localStorage.getItem('lastState')) {
        lastState = localStorage.getItem('lastState');
    }

    // create navigation menu objects
    const navMenu = new NavMenu();
    const homeNavButton = new NavButton('Home', 'home_nav');
    const registerNavButton = new NavButton('Register', 'register_nav');

    // create page objects
    const homePage = new HomePage();
    const registerPage = new RegisterPage();
    const registerInputForm = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');

    // create browser history object
    const browserHistory = new BrowserHistory(lastState);

    // dictionary linking navigation button ids to page objects
    pages = {
        home_nav: homePage,
        register_nav: registerPage
    };

    // show default or browserHistory state page
    if (browserHistory.getPage() === '') {
        // Show default page
        browserHistory.setPage('home');
        homePage.show();
    } else {
        // match browserHistory state to page
        for (const [key, value] of Object.entries(pages)) {
            if (key.split('_')[0] === browserHistory.getPage()) {
                value.show();
            }
        }
    }

    // on browser refresh button, save url to localStorage
    window.onbeforeunload = event => {
        localStorage.setItem('lastState', browserHistory.getPage())
    }

    // on browser back button
    window.onpopstate = event => {
        page = event.state.page;
        // match the popped value to entry in the pages object
        for (const [key, value] of Object.entries(pages)) {
            if (key.split('_')[0] === page) {
                value.show();
            } else {
                value.hide();
            }
        }
    }

    // add event listeners to navigation buttons
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = function() {
            for (const [key, value] of Object.entries(pages)) {
                if (key === this.id) {
                    value.show();
                    // update browser history state object
                    browserHistory.setPage(this.id.split('_')[0]);
                } else {
                    value.hide();
                }
            }
        }
    })
})