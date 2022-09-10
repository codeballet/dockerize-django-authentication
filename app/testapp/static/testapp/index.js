/////////////////////////////////////
// DOMContentLoaded event listener //
/////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for lastState
    let lastState = '';
    if (localStorage.getItem('lastState')) {
        lastState = localStorage.getItem('lastState');
    }

    // Check localStorage for loggedIn
    let loggedIn = 'no';
    if (!localStorage.getItem('loggedIn')) {
        localStorage.setItem('loggedIn', loggedIn)
    } else {
        loggedIn = localStorage.getItem('loggedIn');
    }

    // Create the browserHistory object
    const browserHistory = new BrowserHistory(lastState);

    // Append all HTML content to the base container
    appendContent();

    // Decide which page to show
    if (browserHistory.getPage() === '') {
        // default page
        showPage('home_nav', browserHistory);
    } else {
        // match page to browserHistory state
        showPage(`${browserHistory.getPage()}_nav`, browserHistory)
    }

    // On browser refresh button click, save url to localStorage
    window.onbeforeunload = event => {
        localStorage.setItem('lastState', browserHistory.getPage())
    }

    // On browser back button click
    window.onpopstate = e => {
        showPage(`${e.state.page}_nav`, browserHistory);
    }

    // Create navigation buttons event listeners
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = () => {
            navEvent(button.id, browserHistory)
        }
    });

    // Create login form event listener
    document.querySelector('#login_form').onsubmit = e => {
        e.preventDefault();
        loginEvent(browserHistory);
    }

    // Create registration form event listener
    document.querySelector('#register_form').onsubmit = e => {
        e.preventDefault();
        registerEvent();
    }
});
