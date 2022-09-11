////////////////////
// Event handlers //
////////////////////

// On submitting the login form
function loginEvent(browserHistory) {
    // get csrf token
    const csrftoken = getCookie('csrftoken');

    // fetch api/login
    fetch('api/login', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: document.querySelector('#login-username').value,
            password: document.querySelector('#login-password').value,
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
        // show home page if login successful
        if (localStorage.getItem('loggedIn') === 'yes') {
            showPage('home_nav', browserHistory);
        }
    });
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
function registerEvent() {
    // get csrf token
    const csrftoken = getCookie('csrftoken');

    // fetch api/register
    fetch('api/register', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: document.querySelector('#register-username').value,
            email: document.querySelector('#register-email').value,
            password: document.querySelector('#register-password').value,
            confirmation: document.querySelector('#register-confirmation').value
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
}