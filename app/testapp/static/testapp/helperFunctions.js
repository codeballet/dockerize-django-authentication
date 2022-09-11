//////////////////////
// helper functions //
//////////////////////

// Append all elements to HTML page
function appendContent() {
    NAV_MENU.append();
    HOME_NAV_BUTTON.append();
    REGISTER_NAV_BUTTON.append();
    LOGIN_NAV_BUTTON.append();
    LOGOUT_NAV_BUTTON.append();

    HOME_PAGE.append();
    LOGIN_PAGE.append();
    REGISTER_PAGE.append();

    REGISTER_FORM.append();
    LOGIN_FORM.append();
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
function login() {
    // get csrf token
    const csrftoken = getCookie('csrftoken');

    // fetch api/login
    fetch('api/login', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: document.querySelector('#login_username').value,
            password: document.querySelector('#login_password').value,
        })
    })
    .then(response => {
        console.log(response.status);
        if (response.status === 200) {
            // logged in, set localStorate
            localStorage.setItem('loggedIn', 'yes');
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        // show home page if login success
        if (localStorage.getItem('loggedIn') === 'yes') {
            showPage('home_nav');
        }
    });
}

// Logout user
function logout() {
    fetch('api/logout', {
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200) {
            // logged out, set localStorage
            localStorage.setItem('loggedIn', 'no');
        }
        return response.json()
    })
    .then(result => {
        console.log(result)
        // show home page if logout successful
        if (localStorage.getItem('loggedIn') === 'no') {
            showPage('home_nav');
        }
    });
}

function register() {
    // get csrf token
    const csrftoken = getCookie('csrftoken');

    // fetch api/register
    fetch('api/register', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: document.querySelector('#register_username').value,
            email: document.querySelector('#register_email').value,
            password: document.querySelector('#register_password').value,
            confirmation: document.querySelector('#register_confirmation').value
        })
    })
    .then(response => {
        if (response.status === 201) {
            // registered and logged in, set localStorage
            localStorage.setItem('loggedIn', 'yes');
        }
        return response.json()
    })
    .then(result => {
        console.log(result);
        // show home page if login success
        if (localStorage.getItem('loggedIn') === 'yes') {
            showPage('home_nav');
        }
    });
}

// Show relevant nav buttons
function showNav() {
    HOME_NAV_BUTTON.show();
    if (localStorage.getItem('loggedIn') === 'yes') {
        REGISTER_NAV_BUTTON.hide();
        LOGIN_NAV_BUTTON.hide();
        LOGOUT_NAV_BUTTON.show();
    } else {
        // logged out
        REGISTER_NAV_BUTTON.show();
        LOGIN_NAV_BUTTON.show();
        LOGOUT_NAV_BUTTON.hide();
    }
}

// Show relevant page and update browserHistory state
function showPage(navId = 'home_nav', source = '') {
    showNav();
    for (const [key, value] of Object.entries(PAGES)) {
        if (key === navId) {
            value.show();
            // only update browserHistory if browser backbutton not used
            if (source !== 'pop') {
                browserHistory.currentPage = navId.split('_')[0];
            }
        } else {
            value.hide();
        }
    }
}
