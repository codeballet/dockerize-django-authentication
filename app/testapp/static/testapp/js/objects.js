'use strict'

//////////
// HTML //
//////////

// Links internal
const linkLoginWelcome = new Link('login', 'login_nav', 'link_login_welcome', 'logged_out link');

// Page Title
const pageTitle = new PageTitle('Ask me');

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

// Not logged-in content
const welcomeH2 = new Header2(
    'Welcome!', 
    'welcome_h2', 
    'logged_out'
);
const paragraphWelcome1 = new Paragraph(
    'This is a web application where you can ask questions to an Artificial Intelligence. The AI will respond based on the specific texts it has read.', 
    'paragraph_welcome_1', 
    'logged_out'
);

const paragraphWelcome2 = new Paragraph(
    `Please login to start asking questions`,
    'paragraph_welcome_2',
    'logged_out'
)

// Forms
const registerForm = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');
const loginForm = new InputForm(loginFormInput, 'login_page', 'login_form', 'form');
const questionForm = new InputForm(questionFormInput, 'home_page', 'question_form', 'form' );

// Footer
const footer = new Footer('©Johan Stjernholm 2022, https://github.com/codeballet')


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