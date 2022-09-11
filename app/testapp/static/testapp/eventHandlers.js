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
    // // get csrf token
    // const csrftoken = getCookie('csrftoken');

    // // fetch api/register
    // fetch('api/register', {
    //     method: 'POST',
    //     headers: {'X-CSRFToken': csrftoken},
    //     mode: 'same-origin',
    //     body: JSON.stringify({
    //         username: document.querySelector('#register_username').value,
    //         email: document.querySelector('#register_email').value,
    //         password: document.querySelector('#register_password').value,
    //         confirmation: document.querySelector('#register_confirmation').value
    //     })
    // })
    // .then(response => response.json())
    // .then(result => {
    //     console.log(result);
    // });
}