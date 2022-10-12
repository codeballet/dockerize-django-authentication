'use strict'

//////////////////////
// helper functions //
//////////////////////

// Append elements to HTML page
function appendContent() {
    // Navigation
    navMenu.append();
    homeNavButton.append();
    registerNavButton.append();
    loginNavButton.append();
    logoutNavButton.append();

    // Home page
    homePage.append();
    homeGreeting.append('home_page');
    questionForm.append();
    questionForm.hide();

    // Login page
    loginPage.append();

    // Registration page
    registerPage.append();
    registerForm.append();
    loginForm.append();
}

// Set focus on form fields
const formFocus = () => {
    for (const [key, value] of Object.entries(focus)) {
        document.querySelector(`#${value}`).focus();
    }
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

// Acquire answers from AI
const getAnswers = async (question) => {
    const csrftoken = getCookie('csrftoken');

    console.log('inside getAnswers, sending a fetch request');
    const response = await fetch('api/question', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            question: question
        })
    });

    const result = await response.json();

    if (result) {
        return result;
    } else {
        // Logged out
        questionForm.hide();

        // Change the greeting
        document.querySelector(('#home_greeting')).textContent = `Please log in to ask the AI questions`;

        return 'Not logged in';
    }


}

// Login user
const login = async (username, password) => {
    const csrftoken = getCookie('csrftoken');

    const response = await fetch('api/login', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });

    const result = await response.json();

    if (result.message) {
        return result.message;
    } else {
        throw new Error(result.error);
    }
}

// Logout user
const logout = async() => {
    const csrftoken = getCookie('csrftoken');

    const response = await fetch('api/logout', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin'
    });

    const result = await response.json();

    if (response.status === 200) {
        // Register new userState
        userState.loggedIn = false;

        return result;
    } else {
        throw new Error(result.error);
    }
}

const register = async(username, email, password, confirmation) => {
    const csrftoken = getCookie('csrftoken');

    const response = await fetch('api/register', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirmation: confirmation
        })
    });

    const result = await response.json();

    if (result.message) {
        return result.message;
    } else {
        throw new Error(result.error);
    }
}

const removeUserContent = (contentClass, page) => {
    if (document.querySelectorAll(`.${contentClass}`)) {
        const parent = document.querySelector(`#${page}`);
        const children = document.querySelectorAll(`.${contentClass}`);
        children.forEach(child => {
            parent.removeChild(child);
        });
    }
}

// Show the AI result on the home page
const showAnswers = result => {
    console.log(result);
    
    // Remove previous answers
    removeUserContent('answers', 'home_page');

    let content = {
        1: 'Your question was:',
        2: `"${result['question']}"`,
        3: 'The AI says:'
    };

    // Incrementally add the answers to content
    let i = 4;
    result.answers.forEach(answer => {
        content[i] = `"${answer}"`;
        i++;
    });

    // Append content to user's home page
    const answers = new Answers(content, `answers_${result.user}`, `${result.user} answers`);
    answers.append('home_page');
    
}

// Show home page content from API
const showHome = async () => {
    // Remove previous answers
    removeUserContent('answers', 'home_page');

    try {
        // Call the home api
        const response = await fetch('api/home_loggedin');
        const result = await response.json();

        // Show the questionForm and set focus
        questionForm.show();
        formFocus();

        // Greet the user
        document.querySelector(('#home_greeting')).textContent = `Hello ${result.user}, please ask the AI some questions`;

        return result.user;
    } catch {
        // Not logged in
        questionForm.hide();

         // Change the greeting
         document.querySelector(('#home_greeting')).textContent = `Please log in to ask the AI questions`;


        return 'Not logged in';
    }
}

// nav buttons appearance
function showNav() {
    // show relevant nav buttons
    homeNavButton.show();
    if (userState.loggedIn) {
        registerNavButton.hide();
        loginNavButton.hide();
        logoutNavButton.show();
    } else {
        // logged out
        registerNavButton.show();
        loginNavButton.show();
        logoutNavButton.hide();
    }

    // inactivate all nav buttons
    document.querySelectorAll('.nav_button').forEach(button => {
        button.style.background = color.inactive;
    });
    // activate nav button for displayed page
    const page = browserState.currentPage;
    document.querySelector(`#${page}_nav`).style.background = color.active;
}

// Show relevant page and update browserState state
function showPage(navId = 'home_nav', source = '') {
    for (const [key, value] of Object.entries(pages)) {
        if (key === navId) {
            value.show();
            // only update browserState if browser backbutton not used
            if (source !== 'pop') {
                browserState.currentPage = navId.split('_')[0];
            }
        } else {
            value.hide();
        }
    }

    // Show navigation and set form focus
    showNav();
    formFocus();

    // For home page
    if (browserState.currentPage === 'home') {
        showHome()
        .then((message) => {
            console.log('User: ', message);
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

// Tests of single form fields
const testUsername = username => {
    // Check username for alphanumerical
    if (/^\w+$/.test(username)) {
        return true;
    } else {
        return false;
    }
}

const testEmail = email => {
    if (/^(\w+)@(\w+)(\.\w+)+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

// Validate login form data
const validateLogin = e => {
    // Acquire form field name values
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    // Check username
    if (testUsername(username)) {
        console.log('Username OK');
    } else {
        throw new Error('Username must consist of letters and digits');
    }

    // Check password
    if (password !== '') {
        console.log('Password OK');
    } else {
        throw new Error ('Please enter password');
    }

    return {
        username: username,
        password: password
    };
}

// Validate registration form data
const validateRegistration = e => {
    // Acquire all form field values
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmation = e.target.elements.confirmation.value;

    // Check username
    if (testUsername(username)) {
        console.log('Username OK');
    } else {
        throw new Error('Username must consist of letters and digits');
    }

    // Check email
    if (testEmail(email)) {
        console.log('Email OK');
    } else {
        throw new Error('Invalid email');
    }

    // Check password and confirmation match
    if (password !== '' && password === confirmation) {
        console.log('Password and confirmation OK');
    } else {
        throw new Error('Check your password and confirmation');
    }

    return {
        username: username,
        email: email,
        password: password,
        confirmation: confirmation
    };
}
