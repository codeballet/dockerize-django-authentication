////////////////////
// Event handlers //
////////////////////

function loginFormEvent() {

}

function navEvent(id, browserHistory) {
    // if logout button clicked, log out user
    if (id === 'logout_nav') {
        logout(browserHistory);
    }
    // otherwise, show corresponding page
    showPage(id, browserHistory);
}
