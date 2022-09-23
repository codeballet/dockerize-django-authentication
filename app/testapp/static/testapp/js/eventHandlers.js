'use strict'

////////////////////
// Event handlers //
////////////////////

// On submitting the login form
function loginEvent(e) {
    try {
        const values = validateLogin(e);

        // reset form fields
        e.target.elements.username.value = '';
        e.target.elements.password.value = '';
        
        // call the async login helperFunction
        login(values.username, values.password)
        .then((message) => {
            console.log(message);
            userState.loggedIn = true;
            showPage('home_nav');
        })
        .catch((error) => {
            console.log(error.message);
            alert(error.message);
            showPage('login_nav');
        })
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
}

// On clicking a navigation button
function navEvent(id) {
    if (id === 'logout_nav') {
        // call the async logout helperFunction
        logout()
        .then((message) => {
            console.log(message);
            userState.loggedIn = false;
            showPage('login_nav');
        })
        .catch((error) => {
            console.log(error);
            showPage('login_nav');
        });
    }
    // otherwise, show corresponding page
    showPage(id);
}

// On submitting the registration form
function registerEvent(e) {
    try {
        const values = validateRegistration(e);

        // reset form fields
        e.target.elements.username.value = '';
        e.target.elements.email.value = '';
        e.target.elements.password.value = '';
        e.target.elements.confirmation.value = '';

        // call the async register helperFunction
        register(values.username, values.email, values.password, values.confirmation)
        .then(message => {
            console.log(message);
            userState.loggedIn = true;
            showPage('home_nav');
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message);
        });
    } catch (error) {
        console.log(error.message);
        alert(error.message)
    }
}