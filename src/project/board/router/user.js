const {Router} = require('express');
const {setError} = require('../util/error.js');
const {isLoggedIn} = require('../middleware/passport/checkLogin.js');
const {validate} = require('../middleware/validator/user.js');
const {
    findById,
    findUsers,
    updateById,
    deleteById,
    changePassword,
    joinBand,
    leaveBand,
} = require('../controller/user.js');

const user = new Router();

const onlyOwner = (req, res, next) => {
    const {id} = req.params;
    parseInt(id) !== req.user.id
        ? next(setError(400, 'Only the owner can do it.'))
        : next();
};

/* 인증한 사용자만 허락한다. */
/* "/" 이하의 모든 url 에 대하여 검증한다. */
user.use('/', isLoggedIn);

user.get('/', validate('get', '/'), findUsers);

user.route('/:id')
    .get(validate('get', '/:id'), findById)
    .put(onlyOwner, validate('put', '/:id'), updateById)
    .delete(onlyOwner, validate('delete', '/:id'), deleteById);

user.patch('/:id/pw', onlyOwner, validate('patch', '/:id/pw'), changePassword);

user.route('/band/:id')
    .put(validate('put', '/band/:id'), joinBand)
    .delete(validate('delete', '/band/:id'), leaveBand);

module.exports = user;
