/////////////////////////
// Browser state setup //
/////////////////////////

// Check localStorage for lastState
let lastState = '';
if (localStorage.getItem('lastState')) {
    lastState = localStorage.getItem('lastState');
}

// Create the browserHistory state object
const browserHistory = new BrowserHistory(lastState);

// Check localStorage if 'loggedIn'
if (!localStorage.getItem('loggedIn')) {
    localStorage.setItem('loggedIn', 'no')
}
