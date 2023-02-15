const {Router} = require('express');
const {join, login, logout} = require('../controller/authController.js');

const auth = Router();

/**
 * "/join" 회원 가입
 * "/login" 로그인
 * "/logout" 로그아웃
 */
auth.post("/join", join);
auth.post("/login", login);
auth.post("/logout", logout);

module.exports = auth;
