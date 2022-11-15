'use strict'

//////////////////////////////////
// Generic HTML Element Classes //
//////////////////////////////////

// anchor class
class AClass {
    constructor(content, href, id, className) {
        this.content = content;
        this.href = href;
        this.id = id;
        this.className = className;
    }
    append(appendTo) {
        const a = document.createElement('a');
        a.textContent = this.content;
        a.href = this.href;
        a.id = this.id;
        a.className = this.className
        document.querySelector(`#${appendTo}`).append(a);
    }
}

// div class with flex
class DivClass {
    constructor(id, className) {
        this.id = id;
        this.className = className;
    }
    append(appendTo) {
        const div = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        document.querySelector(`#${appendTo}`).append(div);
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'block'
    }
}

// hr divider class
class HrClass {
    constructor() {}
    append(appendTo) {
        const hr = document.createElement('hr');
        document.querySelector(`#${appendTo}`).append(hr);
    }
}

// h1 class
class H1Class {
    constructor(content, id, className) {
        this.content = content;
        this.id = id;
        this.className = className;
    }
    append(appendTo) {
        const h1 = document.createElement('h1');
        h1.id = this.id;
        h1.className = this.className;
        h1.textContent = this.content;
        document.querySelector(`#${appendTo}`).append(h1);
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'block'
    }
}

// h2 class
class H2Class {
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

// p class
class PClass {
    constructor(content, id, className) {
        this.content = content;
        this.id = id;
        this.className = className;   
    }
    append(appendTo) {
        const p = document.createElement('p');
        p.id = this.id;
        p.className = this.className;
        p.textContent = this.content;
        document.querySelector(`#${appendTo}`).append(p);
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'block'
    }
}

// span class
class SpanClass {
    constructor(content, id, className) {
        this.content = content;
        this.id = id;
        this.className = className;
    }
    append(appendTo) {
        const span = document.createElement('span');
        span.id = this.id;
        span.className = this.className;
        span.textContent = this.content;
        document.querySelector(`#${appendTo}`).append(span);
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'flex'
    }
}


/////////////////////////
// Custom HTML Classes //
/////////////////////////

// Alert message class
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

// Answers from AI class
class Answer {
    constructor(content, id, className) {
        this.content = content;
        this.id = id;
        this.className = className;
    }
    append(appendTo) {
        // Create the outer div for the entire answer
        const answerDiv = new DivClass(this.id, this.className);
        answerDiv.append(appendTo);

        // Create sub divs with match and reference paragraphs
        for (const [k, v] of Object.entries(this.content['answer'])) {
            // Create dividing line
            const hr = new HrClass();
            hr.append(this.id);

            // Create inner div for each sub-answer
            const answerSubDiv = new DivClass(`sub_div_${k}`, 'sub_div');
            answerSubDiv.append(this.id);

            // div for each quote
            const quoteDiv = new DivClass(
                `quote_div_${k}`,
                'quote_div'
            )
            quoteDiv.append(`sub_div_${k}`);
            
            // match paragraph
            const matchP = new PClass(
                `"${v['match']}"`,
                `match_p_${k}`,
                'match_p'
            );
            matchP.append(`quote_div_${k}`);

            // reference div
            const refDiv = new DivClass(
                `ref_div_${k}`,
                'ref_div'
            )
            refDiv.append(`sub_div_${k}`);

            // reference paragraphs
            for (const [key, value] of Object.entries(v)) {
                if (key == 'match') { continue; }
                const p = new PClass(
                    `${key}: ${value}`,
                    `${key}_${value}_p`,
                    'ref_p'
                )
                p.append(`ref_div_${k}`)
            }
        }
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
