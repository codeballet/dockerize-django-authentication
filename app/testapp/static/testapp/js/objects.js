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
const aboutNavButton = new NavButton('About', 'about_nav');

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

// About page
// About page paragraph texts
const textAboutIntroP1 = "The Ask Me application is a research tool concept, created by Johan Stjernholm for the Space Engineering Arts Project."
const textAboutIntroP2 = "Ask Me enables users to ask questions to an Artificial Intelligence, which looks for an answer by means of trying to match a given question to the content of a corpus of texts that the AI has read. The AI presents its answer in the form of a series of referenced quotes."
const textAboutAimsP1 = "The main aim of Ask Me is to inspire researchers, scholars, and creative art practitioners to critically consider current trends concerning how various technologies and algorithms increasingly shape and influence creative practices and research within the creative arts, as well as the human and social sciences."
const textAboutAimsP2 = "There are two key objectives: First, the publication on the Internet of this web application called Ask Me, serving to provide a practical example of how it is possible for creative practitioners, researchers, and scholars to make choices and selectively take charge of the use, and production, of digital tools and algorithms."
const textAboutAimsP3 = "Secondly, to publish an article that outlines in more detail the importance of raising our awareness of how to engage with digital technologies, drawing on some recent theory regarding algorithms, big data, and Artificial Intelligence. That article will also more extensively explain the tools and technologies that underpinds the Ask Me web application."
const textAboutAuthorP1 = "Johan Stjernholm (PhD) is an interdisciplinary artist, working as a Producer, Artistic Director, Choreographer, Composer, Fine Artist, Computer Scientist, and Author."
const textAboutAuthorP2 = "Johan's artistic work has been performed and exhibited across Europe, Asia, and America. Some notable examples of his creations include:"
const listAboutAuthorUl1 = [
    'Alice (2022). Exhibition by Victoria & Albert Museum, featuring performance art co-directed by Johan Stjernholm and Flora Zeta Cheong-Leen. U2 by UCCA, Joy Tower, Beijing, China.',
    'Alchemy: Paths of Transformation (2021 to 2022). Exhibition co-curated by Johan Stjernholm and Flora Zeta Cheong-Leen. Art Haitang, Sanya, Hainan, China.',
    'The Rose of the Universe (2021). Exhibition including the film "Pilgrimate", co-directed by Johan Stjernholm and Flora Zeta Cheong-Leen. Nordic Contemporary Art Center, Xiamen, China.',
    'The Routledge Companion to Dance Studies (2020). Book edited by Helen Thomas and Stacey Prickett. Johan Stjernholm is the author of Chapter 26: "The Scenography of Choreographing the Museum". London: Routledge.',
    'Multiple Identities & Community (2018). Exhibition including works by Johan Stjernholm. Production: Ahang Baoquan and Muyun Art. Today Art Museum, Beijing, China.',
    'Desire Works (2017). Opera Ballet produced, directed, choreographed, and composed by Johan Stjernholm. Haedam Hall, Daegu, South Korea.',
    'The Golden Apple (2016). Opera Ballet produced, directed, and choreographed by Johan Stjernholm. Haedam Hall, Daegu, South Korea.',
    'Lost in Shangri-la (2016). Performance Art designed and choreographed by Johan Stjernholm in collaboration with Flora Zeta Cheong-Leen. Production: Laurence Brahm and National Geographic. Three Shadows Art Centre, Beijing, China.',
    'Repetitions of Disappearance (2015). Exhibition and performance art, designed, curated, choreographed and directed by Johan Stjernholm in collaboration with Flora Zeta Cheong-Leen. Xin Dong Cheng Space for Contemporary Art, District 798, Beijing.',
    'Miss Chinese Cosmos of the Americas (2013 to 2017). TV Pageant Choreographed by Johan Stjernholm. Artistic Director: Flora Zeta Cheong-Leen. Production: Phoenix Satellite TV.',
]
// About page objects
const aboutPage = new Page('about_page', 'page');
// Introduction
const aboutDiv = new DivClass('about_div', 'about');
const aboutIntroH2 = new H2Class('Introduction to the Ask Me application', 'about_intro_h2', 'about');
const aboutIntroP1 = new PClass(textAboutIntroP1, 'about_intro_p1', 'about');
const aboutIntroP2 = new PClass(textAboutIntroP2, 'about_intro_p2', 'about');
// Aims and objectives
const aboutAimsH3 = new H3Class('Aims and Objectives', 'about_aims_h3', 'about');
const aboutAimsP1 = new PClass(textAboutAimsP1, 'about_aims_p1', 'about');
const aboutAimsP2 = new PClass(textAboutAimsP2, 'about_aims_p2', 'about');
const aboutAimsP3 = new PClass(textAboutAimsP3, 'about_aims_p3', 'about');
// About the author
const aboutAuthorH2 = new H2Class('About Johan Stjernholm', 'about_author_h3', 'about');
const aboutAuthorP1 = new PClass(textAboutAuthorP1, 'about_author_p1', 'about');
const aboutAuthorP2 = new PClass(textAboutAuthorP2, 'about_author_p2', 'about');
const aboutAuthorUl1 = new UlClass(listAboutAuthorUl1, 'about_author_ul1', 'about');

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
    about_nav: aboutPage,
};


////////////
// States //
////////////

const browserState = new BrowserState(localStorage.getItem('lastState'));
const userState = new UserState();