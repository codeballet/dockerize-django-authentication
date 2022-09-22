'use strict'

////////////////////////
// Form input objects //
////////////////////////

const registerFormInput = {
    username: {
        id: 'register_username',
        classname: 'form_field',
        name: 'username',
        type: 'text',
        placeholder: 'Username'
    },
    email: {
        id: 'register_email',
        classname: 'form_field',
        name: 'email',
        type: 'text',
        placeholder: 'Email'
    },
    password: {
        id: 'register_password',
        classname: 'form_field',
        name: 'password',
        type: 'password',
        placeholder: 'Password'
    },
    confirmation: {
        id: 'register_confirmation',
        classname: 'form_field',
        name: 'confirmation',
        type: 'password',
        placeholder: 'Confirm password'
    },
    submit: {
        id: 'register_submit',
        classname: 'button',
        type: 'submit'
    }
}

const loginFormInput = {
    username: {
        id: 'login_username',
        classname: 'form_field',
        name: 'username',
        type: 'text',
        placeholder: 'Username'
    },
    password: {
        id: 'login_password',
        classname: 'form_field',
        name: 'password',
        type: 'password',
        placeholder: 'Password'
    },
    submit: {
        id: 'login_submit',
        classname: 'button',
        type: 'submit'
    }
}
