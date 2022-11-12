'use strict'

//////////////////////////
// After page is loaded //
//////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    //////////////////
    // HTML content //
    //////////////////

    // Append all content
    appendContent();

    // Decide which page to show
    if (browserState.currentPage === '') {
        // show default page
        showPage();
    } else {
        // match page to browserState
        showPage(`${browserState.currentPage}_nav`)
    }


    /////////////////////
    // Browser actions //
    /////////////////////

    // On browser refresh button click, update browser state
    window.onbeforeunload = () => {
        browserState.currentPage
    }

    // On browser back button click
    window.onpopstate = e => {
        showPage(`${e.state.page}_nav`, 'pop');
    }


    /////////////////////
    // Event listeners //
    /////////////////////

    // Alert message close event
    document.querySelector('#close_alert').onclick = (e) => {
        e.target.parentElement.style.display = 'none';
    }

    // Navigation button events
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = () => {
            navEvent(button.id);
        }
    });

    // Login form event
    document.querySelector('#login_form').onsubmit = e => {
        e.preventDefault();
        loginEvent(e);
    }

    // Question form event
    document.querySelector('#question_form').onsubmit = e => {
        e.preventDefault();
        questionEvent(e);
    }

    // Registration form event
    document.querySelector('#register_form').onsubmit = e => {
        e.preventDefault();
        registerEvent(e);
    }

    // Button mouseover highlight events
    document.querySelectorAll('.button').forEach(button => {
        button.onmouseenter = e => {
            // hover color button if not active
            const page = browserState.currentPage
            if (e.target.id !== `${page}_nav`) {
                document.querySelector(`#${e.target.id}`).style.background = color.hover;
            }
        }
        button.onmouseleave = e => {
            // reset button to original color if not active
            const page = browserState.currentPage
            if (e.target.id !== `${page}_nav` && e.target.className !== 'button submit') {
                document.querySelector(`#${e.target.id}`).style.background = color.inactive;
            } else if (e.target.className === 'button submit') {
                document.querySelectorAll('.submit').forEach(button => {
                    button.style.background = color.submit;
                })
            }
        }
    })
});
