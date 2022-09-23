'use strict'

//////////////////////
// helper functions //
//////////////////////

// Append all elements to HTML page
function appendContent() {
    // Navigation
    navMenu.append();
    homeNavButton.append();
    registerNavButton.append();
    loginNavButton.append();
    logoutNavButton.append();

    // Home page
    homePage.append();

    // Login page
    loginPage.append();

    // Registration page
    registerPage.append();
    registerForm.append();
    loginForm.append();
}

// Get csrf cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Login user
const login = async (username, password) => {
    const csrftoken = getCookie('csrftoken');

    const response = await fetch('api/login', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });

    const result = await response.json();

    if (result.message) {
        return result.message;
    } else {
        throw new Error(result.error);
    }
}

// Logout user
const logout = async() => {
    const csrftoken = getCookie('csrftoken');

    const response = await fetch('api/logout', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin'
    });

    const result = await response.json();

    if (result.message) {
        // logged out
        return result.message;
    } else {
        throw new Error(result.error);
    }
}

const register = async(username, email, password, confirmation) => {
    const csrftoken = getCookie('csrftoken');

    const response = await fetch('api/register', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirmation: confirmation
        })
    });

    const result = await response.json();

    if (result.message) {
        return result.message;
    } else {
        throw new Error(result.error);
    }
}

// nav buttons appearance
function showNav() {
    // show relevant nav buttons
    homeNavButton.show();
    if (userState.loggedIn) {
        registerNavButton.hide();
        loginNavButton.hide();
        logoutNavButton.show();
    } else {
        // logged out
        registerNavButton.show();
        loginNavButton.show();
        logoutNavButton.hide();
    }

    // inactivate all nav buttons
    document.querySelectorAll('.nav_button').forEach(button => {
        button.style.background = color.inactive;
    });
    // activate nav button for displayed page
    const page = browserState.currentPage;
    document.querySelector(`#${page}_nav`).style.background = color.active;
}

// Show relevant page and update browserState state
function showPage(navId = 'home_nav', source = '') {
    for (const [key, value] of Object.entries(pages)) {
        if (key === navId) {
            value.show();
            // only update browserState if browser backbutton not used
            if (source !== 'pop') {
                browserState.currentPage = navId.split('_')[0];
            }
        } else {
            value.hide();
        }
    }
    showNav();
}

// Tests of single form fields
const testUsername = username => {
    // Check username for alphanumerical
    if (/^\w+$/.test(username)) {
        return true;
    } else {
        return false;
    }
}

const testEmail = email => {
    if (/^(\w+)@(\w+)(\.\w+)+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

// Validate login form data
const validateLogin = e => {
    // Acquire form field name values
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    // Check username
    if (testUsername(username)) {
        console.log('Username OK');
    } else {
        throw new Error('Username must be letters and / or digits');
    }

    // Check password
    if (password !== '') {
        console.log('Password OK');
    } else {
        throw new Error ('Please enter password');
    }

    return {
        username: username,
        password: password
    };
}

// Validate registration form data
const validateRegistration = e => {
    // Acquire all form field values
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmation = e.target.elements.confirmation.value;

    // Check username
    if (testUsername(username)) {
        console.log('Username OK');
    } else {
        throw new Error('Username must be letters and / or digits');
    }

    // Check email
    if (testEmail(email)) {
        console.log('Email OK');
    } else {
        throw new Error('Not a valid email');
    }

    // Check password and confirmation match
    if (password !== '' && password === confirmation) {
        console.log('Password and confirmation OK');
    } else {
        throw new Error('Check your password and confirmation');
    }

    return {
        username: username,
        email: email,
        password: password,
        confirmation: confirmation
    };
}
