const {Router} = require('express');
const {join, login, logout} = require('../controller/auth/authCont.js');
const {login: kakaoIn, callback: kakaoCb, logout: kakaoOut} = require('../controller/auth/kakaoCont.js');
const {isLoggedIn, isNotLoggedIn} = require('../middleware/passport/checkConnect.js');

const auth = Router();

/**
 * "/join": 회원 가입
 * "/login": 로그인
 * "/logout": 로그아웃
 */
auth.post("/join", isNotLoggedIn, join);
auth.post("/login", isNotLoggedIn, login);
auth.get("/logout", isLoggedIn, logout);

auth.get("/kakao", kakaoIn);
auth.get("/kakao/callback", kakaoCb, (req, res, next) => {
    res.redirect('/');
});

module.exports = auth;
