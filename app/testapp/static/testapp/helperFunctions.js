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
function login(username, password) {
    // get csrf token
    const csrftoken = getCookie('csrftoken');

    // fetch api/login
    fetch('api/login', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
    .then(response => {
        console.log(response.status);
        if (response.status === 200) {
            // logged in, update userState
            userState.loggedIn = true;
            // localStorage.setItem('loggedIn', 'yes');
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        // show home page if login success
        if (userState.loggedIn) {
            showPage('home_nav');
        }
        // if (localStorage.getItem('loggedIn') === 'yes') {
        //     showPage('home_nav');
        // }
    });
}

// Logout user
function logout() {
    fetch('api/logout', {
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200) {
            // logged out, update userState
            userState.loggedIn = false;
            // localStorage.setItem('loggedIn', 'no');
        }
        return response.json()
    })
    .then(result => {
        console.log(result)
        // show home page if logout successful
        if (!userState.loggedIn) {
            showPage('home_nav');
        }
        // if (localStorage.getItem('loggedIn') === 'no') {
        //     showPage('home_nav');
        // }
    });
}

function register(username, email, password, confirmation) {
    // get csrf token
    const csrftoken = getCookie('csrftoken');

    // fetch api/register
    fetch('api/register', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirmation: confirmation
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
        if (userState.loggedIn) {
            showPage('home_nav');
        }
        // if (localStorage.getItem('loggedIn') === 'yes') {
        //     showPage('home_nav');
        // }
    });
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
    // if (localStorage.getItem('loggedIn') === 'yes') {
    //     registerNavButton.hide();
    //     loginNavButton.hide();
    //     logoutNavButton.show();
    // } else {
    //     // logged out
    //     registerNavButton.show();
    //     loginNavButton.show();
    //     logoutNavButton.hide();
    // }
}

// Show relevant page and update browserHistory state
function showPage(navId = 'home_nav', source = '') {
    showNav();
    for (const [key, value] of Object.entries(pages)) {
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
