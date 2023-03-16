const {Router} = require('express');
const {isLoggedIn} = require('../middleware/passport/checkLogin.js');
const {validate} = require('../middleware/validator/hashtag.js');
const {find} = require('../controller/hashtag.js');

const tag = new Router();

tag.use(isLoggedIn);

tag.get('/', validate('get', '/'), find);

module.exports = tag;
