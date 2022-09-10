//////////////////
// Page Classes //
//////////////////

// Form class
class InputForm {
    constructor(input, appendTo, id, classname = 'form') {
        this.input = input;
        this.appendTo = appendTo;
        this.id = id;
        this.classname = classname;
    }
    append() {
        // Create and append form element
        const form = document.createElement('form');
        form.id = this.id;
        form.className = this.classname;
        document.querySelector(`#${this.appendTo}`).append(form);

        // Generate the form fields
        for (const [key, value] of Object.entries(this.input)) {
            // for each form input
            const field = document.createElement('input');
            for (const [k, v] of Object.entries(value)) {
                // set form input values
                if (k === 'id') { field.id = v; }
                if (k === 'classname') { field.className = v }
                if (k === 'name') { field.name = v; }
                if (k === 'type') { field.type = v; }
                if (k === 'placeholder') { field.placeholder = v; }
            }
            // append inputs to form
            document.querySelector(`#${this.id}`).append(field);
        }
    }
}


// Navigation button class
class NavButton {
    constructor(textContent, id, className = 'nav_button button') {
        this.textContent = textContent;
        this.id = id;
        this.classname = className;
    }
    append() {
        // create and append nav button
        const navButton = document.createElement('button');
        navButton.id = this.id;
        navButton.className = this.classname;
        navButton.textContent = this.textContent;
        document.querySelector('#nav').append(navButton);
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    hide() {
        document.querySelector(`#${this.id}`).style.display = 'none';
    }
    show() {
        document.querySelector(`#${this.id}`).style.display = 'Block';
    }
}


// Navigation menu class
class NavMenu {
    constructor(id = 'nav', className = 'page') {
        this.id = id;
        this.className = className
    }
    append() {
        const div = document.createElement('div');
        div.id = this.id
        div.className = this.className    
        document.querySelector('.container').append(div);
    }
}


// Page class
class Page {
    constructor(id, className) {
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
        document.querySelector(`#${this.id}`).style.display = 'Block';
    }
}


///////////////////
// State Classes //
///////////////////

// Browser history state class
class BrowserHistory {
    constructor(page = '') {
        this.page = page
    }
    setPage(page) {
        this.page = page;
        history.pushState({page: this.page}, "", this.page);
    }
    getPage() {
        // gets last part of current url
        const url = window.location.href;
        const url_list = url.split('/');
        this.page = url_list[url_list.length -1];
        return this.page
    }
}
