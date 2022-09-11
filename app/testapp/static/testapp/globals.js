////////////////////
// Global objects //
////////////////////

// Create navigation menu objects
const NAV_MENU = new NavMenu();
const HOME_NAV_BUTTON = new NavButton('Home', 'home_nav');
const REGISTER_NAV_BUTTON = new NavButton('Register', 'register_nav');
const LOGIN_NAV_BUTTON = new NavButton('Login', 'login_nav');
const LOGOUT_NAV_BUTTON = new NavButton('Logout', 'logout_nav');

// Create page objects
const HOME_PAGE = new Page('home_page', 'page');
const LOGIN_PAGE = new Page('login_page', 'page');
const REGISTER_PAGE = new Page('register_page', 'page');

// Create forms
const REGISTER_FORM = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');
const LOGIN_FORM = new InputForm(loginFormInput, 'login_page', 'login_form', 'form');


//////////////////////
// Global variables //
//////////////////////

// link nav button ids to page objects object
PAGES = {
    home_nav: HOME_PAGE,
    login_nav: LOGIN_PAGE,
    register_nav: REGISTER_PAGE,
};
