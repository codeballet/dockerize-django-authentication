function getPage() {
    // returns last part of url
    const url = window.location.href;
    const url_list = url.split('/');
    const page = url_list[url_list.length -1];
    return page;
}

function pushPage(page) {
    history.pushState({page: page}, "", page)
}

function setHistory() {
    // sets history state to current page or DEFAULT_PAGE
    const current_page = getPage();
    if (current_page === '') {
        pushPage(DEFAULT_PAGE);
    } else {
        pushPage(current_page);
    }
}


/////////////////
// Form inputs //
/////////////////

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

/////////////
// Objects //
/////////////

// Form object
const InputForm = function(
        input = {}, 
        appendTo = 'register_page', 
        id = 'register_form', 
        classname = 'form'
    ) {
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


// Navigation menu object
const NavMenu = function(id = 'nav', className = 'page') {
    this.id = id;
    this.className = className

    const div = document.createElement('div');
    div.id = this.id
    div.className = this.className
    
    document.querySelector('.container').append(div);
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



////////////////////////
// DOM Content Loaded //
////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // create navigation menu objects
    const navMenu = new NavMenu();
    const homeNavButton = new NavButton('Home', 'home_nav');
    const registerNavButton = new NavButton('Register', 'register_nav');

    // create page objects
    const homePage = new HomePage();
    const registerPage = new RegisterPage();
    const registerInputForm = new InputForm(registerFormInput);

    // link navigation button ids to pages
    pages = {
        home_nav: homePage,
        register_nav: registerPage
    };

    // add event listener to navigation buttons
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = function() {
            console.log(`Clicked on ${this.id}`);
            for (const [key, value] of Object.entries(pages)) {
                if (key === this.id) {
                    value.show();
                } else {
                    value.hide();
                }
            }
        }
    })
})