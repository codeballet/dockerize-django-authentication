////////////////////
// Event handlers //
////////////////////

function loginFormEvent() {

}

function navEvent(id, pages, browserHistory) {
    // if logout button clicked, log out user
    if (id === 'logout_nav') {
        logout(pages, browserHistory);
    }
    // otherwise, show corresponding page
    showPage(id, pages, browserHistory);
}
