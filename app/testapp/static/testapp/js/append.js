'use strict'

////////////////////
// append content //
////////////////////

// Append elements to HTML page
function appendContent() {
    // Page title
    titleDiv.append('container_root');
    titleH1.append('title_div');
    titleHr.append('title_div');

    // Navigation
    navMenu.append();
    homeNavButton.append();
    registerNavButton.append();
    aboutNavButton.append();
    loginNavButton.append();
    logoutNavButton.append();

    // Alert
    alertMessage.append();

    // Home page, logged in content
    homePage.append();
    questionForm.append();
    questionForm.hide();
    thinkingMessage.append();
    // Home page, logged out welcome message
    welcomeAnonDiv.append('home_page');
    welcomeAnonH2.append('welcome_anon_div');
    welcomeAnonP1.append('welcome_anon_div');
    welcomeAnonSpan1.append('welcome_anon_p1');
    welcomeAnonSpan2.append('welcome_anon_p1');
    welcomeAnonSpan3.append('welcome_anon_p1');

    // Login page
    loginPage.append();

    // Registration page
    registerPage.append();
    registerForm.append();
    loginForm.append();

    // About page
    aboutPage.append();
    aboutDiv.append('about_page');
    aboutIntroH2.append('about_div');
    aboutIntroP1.append('about_div');
    aboutIntroP2.append('about_div');
    aboutAimsH3.append('about_div');
    aboutAimsP1.append('about_div');
    aboutAimsP2.append('about_div');
    aboutAimsP3.append('about_div');
    aboutAuthorH2.append('about_div');
    aboutAuthorP1.append('about_div');
    aboutAuthorP2.append('about_div');
    aboutAuthorUl1.append('about_div');

    // Footer
    footerDiv.append('container_root');
    footerHr.append('footer_div');
    footerP.append('footer_div');
    footerSpan.append('footer_paragraph');
    footerAnchor.append('footer_paragraph');
}
