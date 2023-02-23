const {Router} = require('express');
const {join, login, logout} = require('../controller/auth/authCont.js');
const {login: kakaoIn, callback: kakaoCb, logout: kakaoOut} = require('../controller/auth/kakaoCont.js');
const {isLoggedIn, isNotLoggedIn} = require('../middleware/passport/checkConnect.js');

const router = Router();

/**
 * "/join": 회원 가입
 * "/login": 로그인
 * "/logout": 로그아웃
 */
router.post("/join", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);

router.get("/kakao", kakaoIn);
router.get("/kakao/callback", kakaoCb, (req, res, next) => {
    res.redirect('/');
});

module.exports = router;
