const {Router} = require('express');
const {join, login, logout} = require('../controller/auth.js');

const auth = new Router();

auth.post('/join', join);
auth.post('/login', login);
auth.post('/logout', logout);

module.exports = auth;
