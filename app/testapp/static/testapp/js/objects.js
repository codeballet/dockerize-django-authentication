'use strict'

//////////
// HTML //
//////////

// Navigation menu
const navMenu = new NavMenu();
const homeNavButton = new NavButton('Home', 'home_nav');
const registerNavButton = new NavButton('Register', 'register_nav');
const loginNavButton = new NavButton('Login', 'login_nav');
const logoutNavButton = new NavButton('Logout', 'logout_nav');

// Pages
const homePage = new Page('home_page', 'page');
const loginPage = new Page('login_page', 'page');
const registerPage = new Page('register_page', 'page');

// Forms
const registerForm = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');
const loginForm = new InputForm(loginFormInput, 'login_page', 'login_form', 'form');


///////////////
// Variables //
///////////////

// link nav button ids to page objects object
const pages = {
    home_nav: homePage,
    login_nav: loginPage,
    register_nav: registerPage,
};


////////////
// States //
////////////

const browserState = new BrowserState(localStorage.getItem('lastState'));
const userState = new UserState();