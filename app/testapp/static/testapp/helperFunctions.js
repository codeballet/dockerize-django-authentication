//////////////////////
// helper functions //
//////////////////////

// get csrf cookie
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

// logout user and display homepage
function logout(pages, browserHistory) {
    fetch('api/logout', {
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200) {
            // logged out, set localStorage
            localStorage.setItem('loggedIn', false);
        }
        return response.json()
    })
    .then(result => {
        console.log(result)
    });
    // then show home page
    showPage('home_nav', pages, browserHistory);
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

// show nav buttons depending on loggedIn status
// function showNav(homeNavButton, registerNavButton, loginNavButton, logoutNavButton) {
//     if (localStorage.getItem('loggedIn')) {
//         homeNavButton.show();
//         logoutNavButton.show();
//     } else {
//         // logged out
//         homeNavButton.show();
//         loginNavButton.show();
//         registerNavButton.show();
//     }
// }

// factor out fetch from registration form event listener (line 143)

// create login fetch and api
