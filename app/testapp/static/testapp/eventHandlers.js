'use strict'

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
    // call the async login function
    login(username, password).then((message) => {
        console.log(message);
        userState.loggedIn = true;
        showPage('home_nav');
    }).catch((error) => {
        console.log(error);
        showPage('login_nav');
    })
}

// On clicking a navigation button
function navEvent(id) {
    // if logout button clicked, logout user
    if (id === 'logout_nav') {
        // call the async logout function
        logout().then(message => {
            console.log(message);
            userState.loggedIn = false;
            showPage('login_nav');
        }).catch(error => {
            console.log(error);
            showPage(login_nav);
        });
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