const {Router} = require('express');
const {findById, findUsers, updateById, deleteById} = require('../controller/user.js');
const {isLoggedIn} = require('../middleware/passport/checkLogin.js');
const {setError} = require('../util/error.js');

const user = new Router();

const onlyOwner = (req, res, next) => {
    const {id} = req.params;
    parseInt(id) !== req.user.id
        ? next(setError(400, 'Only the owner can do it.'))
        : next();
};

/* 인증한 사용자의 허용만을 허락한다. */
user.use('/', isLoggedIn);

user.get('/', findUsers);
user.route('/:id')
    .get(findById)
    .put(onlyOwner, updateById)
    .delete(onlyOwner, deleteById);

module.exports = user;
