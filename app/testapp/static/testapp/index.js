

/////////////////////////////////////
// DOMContentLoaded event listener //
/////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Append all HTML content to the base container
    appendContent();

    // Decide which page to show
    if (browserHistory.currentPage === '') {
        // default page
        showPage();
    } else {
        // match page to browserHistory state
        showPage(`${browserHistory.currentPage}_nav`)
    }

    // On browser refresh button click, save url to localStorage
    window.onbeforeunload = () => {
        localStorage.setItem('lastState', browserHistory.currentPage)
    }

    // On browser back button click
    window.onpopstate = e => {
        showPage(`${e.state.page}_nav`, 'pop');
    }

    // Create navigation buttons event listeners
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = () => {
            navEvent(button.id)
        }
    });

    // Create login form event listener
    document.querySelector('#login_form').onsubmit = e => {
        e.preventDefault();
        loginEvent();
    }

    // Create registration form event listener
    document.querySelector('#register_form').onsubmit = e => {
        e.preventDefault();
        registerEvent();
    }
});
