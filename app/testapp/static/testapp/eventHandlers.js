////////////////////
// Event handlers //
////////////////////

// On submitting the login form
function loginEvent(browserHistory) {
    login(browserHistory);
}

// On clicking a navigation button
function navEvent(id, browserHistory) {
    // if logout button clicked, log out user
    if (id === 'logout_nav') {
        logout(browserHistory);
    }
    // otherwise, show corresponding page
    showPage(id, browserHistory);
}

// On submitting the registration form
function registerEvent(browserHistory) {
    register(browserHistory);
}