const {body} = require("express-validator");
const {passwordRegex, uniqueIdRegex} = require('./regex.js');

const uniqueId = (key) => {
    const field = key ?? 'uniqueId';
    return body(field)
        /* checkNull: true => null 일 경우 not exist */
        /* checkFalsy: true => "", 0, false, null 일 경우 not exist */
        .exists({checkNull: true, checkFalsy: true})
        .trim().notEmpty()
        .withMessage(`${field} is required`)
        .bail()
        /* 유니크 아이디는 영대소문자, 숫자, 언더바로 구성한다. */
        .matches(uniqueIdRegex)
        // .isLength({min: 1, max: 12})
        .withMessage('You can use uppercase and lowercase letters, numbers, and underscores.(min:1, max:12)')
};

const password = (key) => {
    return body(key ?? 'password')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Password is required.')
        .bail()
        .trim().notEmpty()
        .matches(passwordRegex)
        .withMessage('Please check the password conditions.');
}

module.exports = {
    uniqueId,
    password,
};
