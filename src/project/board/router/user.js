const {Router} = require('express');
const {findById, findUsers, updateById, deleteById, changePassword} = require('../controller/user.js');
const {isLoggedIn} = require('../middleware/passport/checkLogin.js');
const {setError} = require('../util/error.js');
const {param} = require('express-validator');
const {validator} = require('../middleware/validator/index.js');
const {validate} = require('../middleware/validator/user.js');

const user = new Router();

const onlyOwner = (req, res, next) => {
    const {id} = req.params;
    parseInt(id) !== req.user.id
        ? next(setError(400, 'Only the owner can do it.'))
        : next();
};

const checkId = () => {
    return [
        param('id')
            .isInt({gt: 0})
            .withMessage('User id must be a positive integer.'),
        validator,
    ];
};

/* 인증한 사용자만 허락한다. */
/* "/" 이하의 모든 url 에 대하여 검증한다. */
user.use('/', isLoggedIn);
user.get('/', validate('get', '/'), findUsers);

user.use('/:id', checkId());
user.route('/:id')
    .get(findById)
    .put(onlyOwner, validate('put', '/:id'), updateById)
    .delete(onlyOwner, deleteById);

user.patch('/:id/pw', onlyOwner, validate('patch', '/:id/pw'), changePassword);

module.exports = user;
