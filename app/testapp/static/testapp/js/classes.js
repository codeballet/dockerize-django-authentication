'use strict'

//////////////////
// Page Classes //
//////////////////

// div with alert message
// TODO: create an alert message box
// https://www.w3schools.com/howto/howto_js_alert.asp
class AlertMessage {
    constructor(content) {
        this.content = content;
    }
    append() {
        // create div
        const div = document.createElement('div');
        div.id = 'alert';
        document.querySelector('.container').append(div);

        // create alert message
        const msgDiv = document.createElement('div');
        msgDiv.id = 'alert_message';
        msgDiv.textContent = this.content;
        document.querySelector('#alert').append(msgDiv);

        // create close symbol 'x'
        const closeDiv = document.createElement('div');
        closeDiv.id = 'close_alert';
        closeDiv.textContent = '\u00D7';
        document.querySelector('#alert').append(closeDiv);

        // hide element
        document.querySelector('#alert').style.display = 'none';
    }
    hide() {
        document.querySelector('#alert').style.display = 'none';
    }
    show() {
        document.querySelector('#alert').style.display = 'flex';
    }
    set message(m) {
        this.content = m;
        document.querySelector('#alert_message').textContent = this.content;
        this.show();
    }
}

// div with AI answers class
class Answers {
    constructor(content, id, className) {
        this.content = content;
        this.id = id;
        this.className = className;
    }
    append(appendTo) {
        const div = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        document.querySelector(`#${appendTo}`).append(div);
        // Create the paragraphs inside the div
        for (const [key, value] of Object.entries(this.content)) {
            const p = document.createElement('p');
            p.id = `${this.id}_${key}`;
            p.textContent = value;
            if (key === '1' || key === '3') {
                p.style.fontWeight = 'bold';
            }
            document.querySelector(`#${this.id}`).append(p);
        }
    }
}

// Footnote
class Footer {
    constructor(content, id = 'footer_div', className = 'footer') {
        this.content = content;
        this.id = id;
        this.className = className;
    }
    append() {
        // Create div
        const div = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        div.style.position = 'absolute';
        div.style.top = window.scrollY + window.innerHeight - 50 + 'px';
        document.querySelector('.container').append(div);

        // Create dividing line
        const hr = document.createElement('hr');
        document.querySelector(`#${this.id}`).append(hr);
        
        // footer text
        const footer = document.createElement('footer');
        footer.textContent = this.content;
        document.querySelector(`#${this.id}`).append(footer);
    }
}

// Header classes
class Header2 {
    constructor(content, id, className) {
        this.content = content;
        this.id = id;
        this.className = className;
    }
    append(appendTo) {
        const h2 = document.createElement('h2');
        h2.id = this.id;
        h2.className = this.className;
        h2.textContent = this.content;
        document.querySelector(`#${appendTo}`).append(h2);
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'block'
    }
}

// Form class
class InputForm {
    constructor(object, appendTo, id, className = 'form') {
        this.object = object;
        this.appendTo = appendTo;
        this.id = id;
        this.className = className;
    }
    append() {
        // Create and append form element
        const form = document.createElement('form');
        form.id = this.id;
        form.className = this.className;
        document.querySelector(`#${this.appendTo}`).append(form);

        // Generate the form fields
        for (const [key, value] of Object.entries(this.object)) {
            // for each form object
            const field = document.createElement('input');
            for (const [k, v] of Object.entries(value)) {
                // set form field values
                if (k === 'id') { field.id = v; }
                if (k === 'className') { field.className = v }
                if (k === 'name') { field.name = v; }
                if (k === 'type') { field.type = v; }
                if (k === 'placeholder') { field.placeholder = v; }
                // color the submit button
                if (v === 'button submit') { field.style.background = color.submit; }
            }
            // append fields to form
            document.querySelector(`#${this.id}`).append(field);
        }
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'block'
    }
}

// Navigation button class
class NavButton {
    constructor(textContent, id, className = 'nav_button button') {
        this.textContent = textContent;
        this.id = id;
        this.className = className;
    }
    append() {
        // create and append nav button
        const navButton = document.createElement('button');
        navButton.id = this.id;
        navButton.className = this.className;
        navButton.textContent = this.textContent;
        navButton.style.background = color.inactive;
        document.querySelector('#nav').append(navButton);
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'block';
    }
}

// Navigation menu class
class NavMenu {
    constructor(id = 'nav', className = 'page') {
        this.id = id;
        this.className = className;
    }
    append() {
        const div = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        document.querySelector('.container').append(div);
    }
}

// Page class
class Page {
    constructor(id, className = 'page') {
        this.id = id;
        this.className = className;
    }
    append() {
        const div = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        document.querySelector('.container').append(div);
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'block';
    }
}

// Page title
class PageTitle {
    constructor(content, id = 'page_title', className = 'title') {
        this.content = content;
        this.id = id;
        this.className = className;
    }
    append() {
        // Crate div
        const div = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        document.querySelector('.container').append(div);

        // Create title header
        const h1 = document.createElement('h1');
        h1.textContent = this.content;
        document.querySelector(`#${this.id}`).append(h1);

        // Create dividing line
        const hr = document.createElement('hr')
        document.querySelector(`#${this.id}`).append(hr);
    }
}

// While thinking message
class ThinkingMessage {
    constructor(content, id = 'thinking_div', className = 'hidden') {
        this.content = content;
        this.id = id;
        this.className = className;
    }
    append() {
        // create enclosing div
        const div = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        document.querySelector('.container').append(div);

        // create message
        const msgDiv = document.createElement('div');
        msgDiv.id = `${this.id}_msg`;
        msgDiv.textContent = this.content;
        document.querySelector(`#${this.id}`).append(msgDiv);

        // hide element
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
        this.className = 'hidden';
        document.querySelector(`#${this.id}`).className = this.className
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'flex';
        this.className = 'visible';
        document.querySelector(`#${this.id}`).className = this.className
    }
}


///////////////////
// State Classes //
///////////////////

// Track browser history state
class BrowserState {
    constructor(page = '') {
        this.page = page;
    }
    get currentPage() {
        // acquire last part of current url
        const url = window.location.href;
        const url_list = url.split('/');
        this.page = url_list[url_list.length -1];
        // update browser localStorage
        localStorage.setItem('lastState', this.page);

        return this.page;
    }
    set currentPage(page) {
        this.page = page;
        // update browser history
        history.pushState({page: this.page}, "", this.page);
        // update browser localStorage
        localStorage.setItem('lastState', this.page);
    }
}

// Track user state
class UserState {
    constructor(loginState = false) {
        this.loginState = loginState;
    }
    get loggedIn() {
        if (!localStorage.getItem('loggedIn')) {
            // localStorage value not created
            localStorage.setItem('loggedIn', 'no');
            this.loginState = false
            return this.loginState;
        } else if (localStorage.getItem('loggedIn') === 'yes') {
            // logged in
            this.loginState = true;
            return this.loginState;
        } else {
            // not logged in
            this.loginState = false;
            // make sure localStorage is 'no'
            localStorage.setItem('loggedIn', 'no');
            return this.loginState;
        }
    }
    set loggedIn(value) {
        this.loginState = value;
        if (value) {
            localStorage.setItem('loggedIn', 'yes');
        } else {
            localStorage.setItem('loggedIn', 'no');
        }
    }
}
