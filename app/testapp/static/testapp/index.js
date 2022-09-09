//////////////////////
// helper functions //
//////////////////////

// get csrf cookie from browser
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

// show relevant page and update browserHistory state
function showPage(navId, pages, browserHistory = null) {
    console.log(navId);
    for (const [key, value] of Object.entries(pages)) {
        if (key === navId) {
            value.show();
            if (browserHistory){
                browserHistory.setPage(navId.split('_')[0]);
            }
        } else {
            value.hide();
        }
    }
}


////////////////////
// Event handlers //
////////////////////
function logout(pages, browserHistory) {
    fetch('api/logout', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
    });
    // then show home page
}

function navEvent(id, pages, browserHistory) {
    if (id === 'logout_nav') {
        logout(pages, browserHistory);
    }
    showPage(id, pages, browserHistory);
}

////////////////////////
// DOM Content Loaded //
////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // check localStorage for lastState
    console.log(localStorage.getItem('lastState'));
    let lastState = '';
    if (localStorage.getItem('lastState')) {
        lastState = localStorage.getItem('lastState');
    }


    // create page content

    // navigation menu objects
    const navMenu = new NavMenu();
    const homeNavButton = new NavButton('Home', 'home_nav');
    const registerNavButton = new NavButton('Register', 'register_nav');
    const loginNavButton = new NavButton('Login', 'login_nav');
    const logoutNavButton = new NavButton('Logout', 'logout_nav');

    // page objects
    const homePage = new Page('home_page', 'page');
    const loginPage = new Page('login_page', 'page');
    const registerPage = new Page('register_page', 'page');

    // forms
    const registerForm = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');
    const loginForm = new InputForm(loginFormInput, 'login_page', 'login_form', 'form');

    
    // create state objects

    // browser history object
    const browserHistory = new BrowserHistory(lastState);

    // link nav button ids to page objects object
    pages = {
        home_nav: homePage,
        login_nav: loginPage,
        register_nav: registerPage
    };


    // setup page view

    // show default or browserHistory state page
    if (browserHistory.getPage() === '') {
        browserHistory.setPage('home');
        homePage.show();
    } else {
        // match browserHistory state to page
        showPage(`${browserHistory.getPage()}_nav` , pages, browserHistory)
    }


    // Browser actions

    // on browser refresh, save url to localStorage
    window.onbeforeunload = event => {
        localStorage.setItem('lastState', browserHistory.getPage())
    }

    // on browser back button
    window.onpopstate = e => {
        showPage(`${e.state.page}_nav`, pages);
    }


    // Event listeners

    // navigation buttons event listeners
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = () => {
            navEvent(button.id, pages, browserHistory)
        }
    });

    // registration form event listener
    document.querySelector('#register_form').onsubmit = e => {
        e.preventDefault();
        console.log('Submitted registration form');

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