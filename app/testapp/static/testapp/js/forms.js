'use strict'

////////////////////////
// Form input objects //
////////////////////////

const registerFormInput = {
    username: {
        id: 'register_username',
        className: 'form_field',
        name: 'username',
        type: 'text',
        placeholder: 'Username'
    },
    email: {
        id: 'register_email',
        className: 'form_field',
        name: 'email',
        type: 'text',
        placeholder: 'Email'
    },
    password: {
        id: 'register_password',
        className: 'form_field',
        name: 'password',
        type: 'password',
        placeholder: 'Password'
    },
    confirmation: {
        id: 'register_confirmation',
        className: 'form_field',
        name: 'confirmation',
        type: 'password',
        placeholder: 'Confirm password'
    },
    submit: {
        id: 'register_submit',
        className: 'button submit',
        type: 'submit'
    }
}

const loginFormInput = {
    username: {
        id: 'login_username',
        className: 'form_field',
        name: 'username',
        type: 'text',
        placeholder: 'Username'
    },
    password: {
        id: 'login_password',
        className: 'form_field',
        name: 'password',
        type: 'password',
        placeholder: 'Password'
    },
    submit: {
        id: 'login_submit',
        className: 'button submit',
        type: 'submit'
    }
}
