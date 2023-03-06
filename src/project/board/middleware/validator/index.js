const {Router} = require('express');
const auth = require('./auth.js');

const url = {
    auth: '/auth',
    user: '/user',
};

const validator = new Router();

validator.use(url.auth,

module.exports = {
    validator,
};
