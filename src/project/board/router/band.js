const {Router} = require('express');
const {isLoggedIn} = require("../middleware/passport/checkLogin");
const {createOne, findById, findBands} = require('../controller/band.js');
const {validate} = require('../middleware/validator/band.js');

const band = new Router();

/* 인증한 사용자만 허락한다. */
/* "/" 이하의 모든 url 에 대하여 검증한다. */
band.use('/', isLoggedIn);

band.route('/')
    .post(validate('post', '/'), createOne)
    .get(validate('get', '/'), findBands);

band.route('/:id')
    .get(findById)

module.exports = band;
