const {Router} = require('express');
const {join, login, logout} = require('../controller/auth.js');
const {isLoggedIn, isNotLoggedIn} = require('../middleware/passport/checkLogin.js');

const auth = new Router();

auth.post('/join', isNotLoggedIn, join);
auth.post('/login', isNotLoggedIn, login);
auth.post('/logout', isLoggedIn, logout);

module.exports = auth;
