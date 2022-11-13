'use strict'

//////////
// HTML //
//////////

// Page Title, Static
const titleDiv = new DivClass('title_div', 'static');
const titleH1 = new H1Class('Ask Me', 'title_h1', 'static');
const titleHr = new HrClass();

// Alerts and Messages
const alertMessage = new AlertMessage('Alert message');
const thinkingMessage = new ThinkingMessage('Please wait, I am thinking about it...');

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
const questionForm = new InputForm(questionFormInput, 'home_page', 'question_form', 'form' );

// Footer, Static
const footerDiv = new DivClass('footer_div', 'static');
const footerHr = new HrClass();
const footerP = new PClass(
    '',
    'footer_paragraph',
    'static'
);
const footerSpan = new SpanClass(
    '©Johan Stjernholm 2022, ', 
    'footer_span', 
    'static'
);
const footerAnchor = new AClass(
    'https://github.com/codeballet',
    'https://github.com/codeballet',
    'footer_anchor',
    'static'
)

///////////////
// Variables //
///////////////

// Button colours
const color = {
    active: '#90fba2',
    inactive: '#bdd5d2',
    hover: '#f7d18a',
    submit: '#a3eaff'
}

// Form field focuses
const focus = {
    login: 'login_username',
    question: 'question',
    register: 'register_username'
}

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