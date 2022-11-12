'use strict'

////////////////////
// append content //
////////////////////

// Append elements to HTML page
function appendContent() {
    // Page title
    pageTitle.append();

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
    footer.append();
}
