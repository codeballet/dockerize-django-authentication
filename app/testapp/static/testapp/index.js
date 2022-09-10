////////////////////////
// DOM Content Loaded //
////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for lastState
    let lastState = '';
    if (localStorage.getItem('lastState')) {
        lastState = localStorage.getItem('lastState');
    }

    // Check localStorage for loggedIn
    let loggedIn = false;
    if (localStorage.getItem('loggedIn')) {
        loggedIn = localStorage.getItem('loggedIn');
    }

    // Create browser history object
    const browserHistory = new BrowserHistory(lastState);

    // Append page contents
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

    // navigation
    // showNav(HOME_NAV_BUTTON, REGISTER_NAV_BUTTON, LOGIN_NAV_BUTTON, LOGOUT_NAV_BUTTON);

    // default or browserHistory state page
    if (browserHistory.getPage() === '') {
        showPage('home_nav', browserHistory);
    } else {
        // match browserHistory state to page
        showPage(`${browserHistory.getPage()}_nav`, browserHistory)
    }

    // on browser refresh, save url to localStorage
    window.onbeforeunload = event => {
        localStorage.setItem('lastState', browserHistory.getPage())
    }

    // on browser back button
    window.onpopstate = e => {
        showPage(`${e.state.page}_nav`, browserHistory);
    }

    // navigation buttons event listeners
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = () => {
            navEvent(button.id, browserHistory)
        }
    });

    // login form event listener
    document.querySelector('#login_form').onsubmit = e => {
        e.preventDefault();
        loginEvent();
    }

    // registration form event listener
    document.querySelector('#register_form').onsubmit = e => {
        e.preventDefault();
        registerEvent();
    }
});
