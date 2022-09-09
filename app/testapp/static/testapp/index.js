////////////////
// csrf token //
////////////////

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


////////////////////////
// DOM Content Loaded //
////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // check localStorage for lastState
    let lastState = '';
    if (localStorage.getItem('lastState')) {
        lastState = localStorage.getItem('lastState');
    }


    // Pages

    // create navigation menu objects
    const navMenu = new NavMenu();
    const homeNavButton = new NavButton('Home', 'home_nav');
    const registerNavButton = new NavButton('Register', 'register_nav');

    // create page objects
    const homePage = new Page('home_page', 'page');
    const registerPage = new Page('register_page', 'page');

    // create forms
    const registerInputForm = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');


    // State object

    // create browser history object
    const browserHistory = new BrowserHistory(lastState);

    // dictionary linking navigation button ids to page objects
    pages = {
        home_nav: homePage,
        register_nav: registerPage
    };

    // show default or browserHistory state page
    if (browserHistory.getPage() === '') {
        // Show default page
        browserHistory.setPage('home');
        homePage.show();
    } else {
        // match browserHistory state to page
        for (const [key, value] of Object.entries(pages)) {
            if (key.split('_')[0] === browserHistory.getPage()) {
                value.show();
            }
        }
    }


    // Browser actions

    // on browser refresh button, save url to localStorage
    window.onbeforeunload = event => {
        localStorage.setItem('lastState', browserHistory.getPage())
    }

    // on browser back button
    window.onpopstate = event => {
        page = event.state.page;
        // match the popped value to entry in the pages object
        for (const [key, value] of Object.entries(pages)) {
            if (key.split('_')[0] === page) {
                value.show();
            } else {
                value.hide();
            }
        }
    }


    // Event listeners

    // navigation buttons event listeners
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = function() {
            for (const [key, value] of Object.entries(pages)) {
                if (key === this.id) {
                    value.show();
                    // update browser history state object
                    browserHistory.setPage(this.id.split('_')[0]);
                } else {
                    value.hide();
                }
            }
        }
    });

    // registration form event listener
    document.querySelector('#register_form').onsubmit = e => {
        e.preventDefault();
        console.log('Submitted registration form');

        // get csrf token
        const csrftoken = getCookie('csrftoken');

        // call api/register backend
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