const {Router} = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../middleware/passport/checkConnect.js');
const {follow} = require('../controller/userCont.js');

const router = Router();

router.post('/:id/follow', isLoggedIn, follow);

module.exports = router;
