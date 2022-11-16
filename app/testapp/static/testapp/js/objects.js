'use strict'

//////////////////
// HTML content //
//////////////////

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

// Home page
const homePage = new Page('home_page', 'page');
// Logged in content
const questionForm = new InputForm(questionFormInput, 'home_page', 'question_form', 'form' );
// Logged out content
const welcomeAnonDiv = new DivClass('welcome_anon_div', 'logged_out');
const welcomeAnonH2 = new H2Class('Welcome!', 'welcome_anon_h2', 'logged_out');
const welcomeAnonP1 = new PClass('', 'welcome_anon_p1', 'logged_out');
const welcomeAnonSpan1 = new SpanClass('Please ', 'welcome_anon_span1', 'logged_out');
const welcomeAnonSpan2 = new SpanClass('login', 'welcome_anon_span2', 'link logged_out');
const welcomeAnonSpan3 = new SpanClass(' to ask the AI questions', 'welcome_anon_span3', 'logged_out');

// Login page
const loginPage = new Page('login_page', 'page');
const loginForm = new InputForm(loginFormInput, 'login_page', 'login_form', 'form');

// Register page
const registerPage = new Page('register_page', 'page');
const registerForm = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');

// Footer
const footerDiv = new DivClass('footer_div', 'footer');
const footerHr = new HrClass();
const footerP = new PClass('', 'footer_paragraph', 'footer');
const footerSpan = new SpanClass(
    '©Johan Stjernholm 2022, ', 
    'footer_span', 
    'footer'
);
const footerAnchor = new AClass(
    'https://github.com/codeballet',
    'https://github.com/codeballet',
    'footer_anchor',
    'footer'
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