////////////////////
// Event handlers //
////////////////////

// On submitting the login form
function loginEvent() {
    login();
}

// On clicking a navigation button
function navEvent(id) {
    // if logout button clicked, log out user
    if (id === 'logout_nav') {
        logout();
    }
    // otherwise, show corresponding page
    showPage(id);
}

// On submitting the registration form
function registerEvent() {
    register();
}