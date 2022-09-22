'use strict'

//////////////////////
// helper functions //
//////////////////////

// Append all elements to HTML page
function appendContent() {
    navMenu.append();
    homeNavButton.append();
    registerNavButton.append();
    loginNavButton.append();
    logoutNavButton.append();

    homePage.append();
    loginPage.append();
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

// Show relevant nav buttons
function showNav() {
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
}

// Show relevant page and update browserState state
function showPage(navId = 'home_nav', source = '') {
    showNav();
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
}
