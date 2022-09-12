////////////////////
// Global objects //
////////////////////

// Create navigation menu objects
const navMenu = new NavMenu();
const homeNavButton = new NavButton('Home', 'home_nav');
const registerNavButton = new NavButton('Register', 'register_nav');
const loginNavButton = new NavButton('Login', 'login_nav');
const logoutNavButton = new NavButton('Logout', 'logout_nav');

// Create page objects
const homePage = new Page('home_page', 'page');
const loginPage = new Page('login_page', 'page');
const registerPage = new Page('register_page', 'page');

// Create forms
const registerForm = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');
const loginForm = new InputForm(loginFormInput, 'login_page', 'login_form', 'form');


//////////////////////
// Global variables //
//////////////////////

// link nav button ids to page objects object
pages = {
    home_nav: homePage,
    login_nav: loginPage,
    register_nav: registerPage,
};


///////////////////
// State objects //
///////////////////

const browserHistory = new BrowserHistory(localStorage.getItem('lastState'));
const userState = new UserState();