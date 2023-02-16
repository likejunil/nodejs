const {Router} = require('express');
const {main, join, profile} = require('../controller/pageCont.js');

const page = Router();

/* 해당 라우터의 요청에 대하여 공통적으로 처리해야 할 사항 */
page.use((req, res, next) => {
    next();
});

/**
 * "/": 최초 진입 페이지
 * "/join": 회원 가입 페이지
 * "/profile": 기본 정보 페이지
 */
page.get("/", main);
page.get("/join", join);
page.get("/profile", profile);

module.exports = page;
