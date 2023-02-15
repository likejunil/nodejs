const {Router} = require('express');
const {auth} = require('./authRouter.js');
const {page} = require('./pageRouter.js');

const router = Router();

/* 순서를 조심할 것 */
/* 구체적인 url 을 먼저 위치시켜서 처리가 누락되지 않도록.. */
router.use('/auth', auth);
router.use('/', page);

module.exports = router;
