////////////////////////
// DOM Content Loaded //
////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // check localStorage for lastState
    let lastState = '';
    if (localStorage.getItem('lastState')) {
        lastState = localStorage.getItem('lastState');
    }

    // create navigation menu objects
    const navMenu = new NavMenu();
    const homeNavButton = new NavButton('Home', 'home_nav');
    const registerNavButton = new NavButton('Register', 'register_nav');

    // create page objects
    const homePage = new HomePage();
    const registerPage = new RegisterPage();
    const registerInputForm = new InputForm(registerFormInput, 'register_page', 'register_form', 'form');

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

    // add event listeners to navigation buttons
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
    })
})