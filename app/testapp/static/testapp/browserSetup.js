///////////////////
// Browser setup //
///////////////////

// Check localStorage if 'loggedIn'
if (!localStorage.getItem('loggedIn')) {
    localStorage.setItem('loggedIn', 'no')
}
