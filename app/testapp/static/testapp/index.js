////////////////////////
// DOM Content Loaded //
////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // check localStorage for lastState
    console.log(`localStorage lastState: ${localStorage.getItem('lastState')}`);
    let lastState = '';
    if (localStorage.getItem('lastState')) {
        lastState = localStorage.getItem('lastState');
    }

    // check localStorage for loggedIn
    console.log(`localStorage loggedIn: ${localStorage.getItem('loggedIn')}`);
    let loggedIn = false;
    if (localStorage.getItem('loggedIn')) {
        loggedIn = localStorage.getItem('loggedIn');
    }
    console.log(`loggedIn: ${loggedIn}`);

    // Append content
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

    // Create state objects

    // browser history object
    const browserHistory = new BrowserHistory(lastState);


    // View content

    // navigation
    // showNav(HOME_NAV_BUTTON, REGISTER_NAV_BUTTON, LOGIN_NAV_BUTTON, LOGOUT_NAV_BUTTON);

    // default or browserHistory state page
    if (browserHistory.getPage() === '') {
        showPage('home_nav', browserHistory);
    } else {
        // match browserHistory state to page
        showPage(`${browserHistory.getPage()}_nav`, browserHistory)
    }


    // Browser actions

    // on browser refresh, save url to localStorage
    window.onbeforeunload = event => {
        localStorage.setItem('lastState', browserHistory.getPage())
    }

    // on browser back button
    window.onpopstate = e => {
        showPage(`${e.state.page}_nav`, browserHistory);
    }


    // Event listeners

    // navigation buttons event listeners
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = () => {
            navEvent(button.id, browserHistory)
        }
    });

    // login form event listener
    document.querySelector('#login_form').onsubmit = e => {
        e.preventDefault();
        console.log('Submit login form')

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

    // registration form event listener
    document.querySelector('#register_form').onsubmit = e => {
        e.preventDefault();
        console.log('Submit registration form');

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
});
