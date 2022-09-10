////////////////////
// Event handlers //
////////////////////

function loginEvent() {
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
            localStorage.setItem('loggedIn', true);
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
    });
}

function navEvent(id, browserHistory) {
    // if logout button clicked, log out user
    if (id === 'logout_nav') {
        logout(browserHistory);
    }
    // otherwise, show corresponding page
    showPage(id, browserHistory);
}

function registerEvent() {
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
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
}