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
    loginNavButton.append();
    logoutNavButton.append();

    // Alert
    alertMessage.append();

    // Home page
    homePage.append();
    questionForm.append();
    questionForm.hide();
    thinkingMessage.append();

    // Login page
    loginPage.append();

    // Registration page
    registerPage.append();
    registerForm.append();
    loginForm.append();

    // Footer
    footerDiv.append('container_root');
    footerHr.append('footer_div');
    footerP.append('footer_div');
    footerSpan.append('footer_paragraph');
    footerAnchor.append('footer_paragraph');
}
