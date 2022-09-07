// Constants
const DEFAULT_PAGE = 'home';

function getPage() {
    // returns last part of url
    const url = window.location.href;
    const url_list = url.split('/');
    const page = url_list[url_list.length -1];
    return page;
}

function hidePages() {
    const pages = document.querySelectorAll('.page');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
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

function showPage(page) {
    console.log(page);
    hidePages();
    document.querySelector(`#${page}_page`).style.display = 'block';
}

// Navigation menu
function createNav() {
    // div for nav elements
    const div = document.createElement('div');
    div.id = 'nav';
    // home nav button
    const home_nav = document.createElement('button');
    home_nav.id = 'home_nav';
    home_nav.innerHTML = 'Home';
    // register nav button
    const register_nav = document.createElement('button');
    register_nav.id = 'register_nav';
    register_nav.innerHTML = 'Register';
    // append nav elements
    document.querySelector('.container').append(div);
    document.querySelector('#nav').append(home_nav);
    document.querySelector('#nav').append(register_nav);
}

// Home page
function pageHome() {
    // div for Home page
    const div = document.createElement('div');
    div.id = 'home_page';
    div.className = 'page';
    // content
    const content = document.createElement('h1');
    content.id = 'home_content';
    content.innerHTML = 'This is the Home Page.';
    // append elements
    document.querySelector('.container').append(div);
    document.querySelector('#home_page').append(content);
}

// Registration page
function pageRegister() {
    // div for registration page
    const div = document.createElement('div');
    div.id = 'register_page'
    div.className = 'page';
    // form
    const form = document.createElement('form');
    form.id = 'register_form';
    // given name text input
    const given_name = document.createElement('input');
    given_name.id = 'register_name';
    given_name.name = 'given_name';
    given_name.type = 'text';
    given_name.placeholder = 'Given name';
    // name text input
    const family_name = document.createElement('input');
    family_name.id = 'register_name';
    family_name.name = 'family_name';
    family_name.type = 'text';
    family_name.placeholder = 'Family name';
    // email text input
    const email = document.createElement('input');
    email.id = 'register_email';
    email.name = 'email';
    email.type = 'text';
    email.placeholder = 'Email';
    // submit element
    const submit = document.createElement('input');
    submit.id = 'register_submit';
    submit.type = 'submit';
    //append elements
    document.querySelector('.container').append(div);
    document.querySelector('#register_page').append(form);
    document.querySelector('#register_form').append(family_name);
    document.querySelector('#register_form').append(given_name);
    document.querySelector('#register_form').append(email);
    document.querySelector('#register_form').append(submit);
}


document.addEventListener('DOMContentLoaded', () => {
    createNav();
    pageRegister();
    pageHome();
    setHistory();
    console.log(history.state.page);
    showPage(history.state.page);
})