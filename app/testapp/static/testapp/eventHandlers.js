////////////////////
// Event handlers //
////////////////////

// On submitting the login form
function loginEvent(e) {
    // get form field name values
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    // reset form fields
    e.target.elements.username.value = '';
    e.target.elements.password.value = '';
    login(username, password);
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
function registerEvent(e) {
    // get form field name values
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmation = e.target.elements.confirmation.value
    // reset form fields
    e.target.elements.username.value = '';
    e.target.elements.email.value = '';
    e.target.elements.password.value = '';
    e.target.elements.confirmation.value = '';
    register(username, email, password, confirmation);
}