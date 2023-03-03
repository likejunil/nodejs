const {Router} = require('express');
const {join, login, logout} = require('../controller/auth/local.js');
const {isLoggedIn, isNotLoggedIn} = require('../middleware/passport/checkLogin.js');
const {login: kakaoIn, logout: kakaoOut, callback: kakaoCb} = require('../controller/auth/kakao.js');

const auth = new Router();

/* local */
auth.post('/join', isNotLoggedIn, join);
auth.post('/login', isNotLoggedIn, login);
auth.post('/logout', isLoggedIn, logout);

/* kakao */
auth.get('/kakao/login', isNotLoggedIn, kakaoIn);
auth.post('/kakao/logout', isNotLoggedIn, kakaoOut);
auth.get('/kakao/callback', kakaoCb)

module.exports = auth;
