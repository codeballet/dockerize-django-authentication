/////////////////////////////////////
// DOMContentLoaded event listener //
/////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for lastState
    let lastState = '';
    if (localStorage.getItem('lastState')) {
        lastState = localStorage.getItem('lastState');
    }

    // Check localStorage if 'loggedIn'
    if (!localStorage.getItem('loggedIn')) {
        localStorage.setItem('loggedIn', 'no')
    }

    // Create the browserHistory object
    const browserHistory = new BrowserHistory(lastState);

    // Append all HTML content to the base container
    appendContent();

    // Decide which page to show
    if (browserHistory.currentPage === '') {
        // default page
        showPage('home_nav', browserHistory);
    } else {
        // match page to browserHistory state
        showPage(`${browserHistory.currentPage}_nav`, browserHistory)
    }

    // On browser refresh button click, save url to localStorage
    window.onbeforeunload = event => {
        localStorage.setItem('lastState', browserHistory.currentPage)
    }

    // On browser back button click
    window.onpopstate = e => {
        showPage(`${e.state.page}_nav`, browserHistory, 'pop');
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
        registerEvent(browserHistory);
    }
});
