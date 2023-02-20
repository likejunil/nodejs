const {Router} = require('express');
const {main, join, profile} = require('../controller/pageCont.js');
const {isLoggedIn, isNotLoggedIn} = require('../middleware/passport/checkConnect.js');

const page = Router();

/* 해당 라우터의 요청에 대하여 공통적으로 처리해야 할 사항 */
page.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

/**
 * "/": 최초 진입 페이지
 * "/join": 회원 가입 페이지
 * "/profile": 기본 정보 페이지
 */
page.get("/", main);
page.get("/join", isNotLoggedIn, join);
page.get("/profile", isLoggedIn, profile);

module.exports = page;
