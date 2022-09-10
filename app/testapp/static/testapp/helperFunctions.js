//////////////////////
// helper functions //
//////////////////////

// Append all elements to HTML page
function appendContent() {
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
}

// Get csrf cookie
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

// Logout user
function logout(browserHistory) {
    fetch('api/logout', {
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200) {
            // logged out, set localStorage
            localStorage.setItem('loggedIn', 'no');
        }
        return response.json()
    })
    .then(result => {
        console.log(result)
        // show home page if logout successful
        if (localStorage.getItem('loggedIn') === 'no') {
            showPage('home_nav', browserHistory);
        }
    });
}

// Show relevant nav buttons
function showNav() {
    HOME_NAV_BUTTON.show();
    if (localStorage.getItem('loggedIn') === 'yes') {
        REGISTER_NAV_BUTTON.hide();
        LOGIN_NAV_BUTTON.hide();
        LOGOUT_NAV_BUTTON.show();
    } else {
        // logged out
        REGISTER_NAV_BUTTON.show();
        LOGIN_NAV_BUTTON.show();
        LOGOUT_NAV_BUTTON.hide();
    }
}

// Show relevant page and update browserHistory state
function showPage(navId, browserHistory, source = '') {
    showNav();
    for (const [key, value] of Object.entries(PAGES)) {
        if (key === navId) {
            value.show();
            // only update browserHistory if browser backbutton not used
            if (source !== 'pop') {
                browserHistory.currentPage = navId.split('_')[0];
            }
        } else {
            value.hide();
        }
    }
}
