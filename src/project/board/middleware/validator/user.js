const {body} = require('express-validator');
const {validator} = require('./index.js');
const {password} = require('./common.js');
const {nickRegex} = require('./regex.js');

const changePassword = () => {
    return body('old')
        /* 다음 if 조건이 만족될 때 다음으로 진행된다. */
        /* if 조건이 만족되지 않으면 해당 검증은 패스된다. */
        .if(body('plain').exists())
        .notEmpty()
        /* custom 에서 req, path, location 을 인자로 사용 가능 */
        /* path: old, location: body */
        .custom((value, {req}) => value !== req.body.plain)
        .withMessage('A new password is required.');
}

const nick = (key) => {
    return body(key ?? 'nick')
        .trim().notEmpty()
        .matches(nickRegex)
        .withMessage('You can use uppercase and lowercase letters, numbers, and underscores.(min:1, max:12)');
};

/* 존재할 경우에만 검증 */
/* if() */
const email = () => {
    return body('email')
        .if(body('email').exists())
        .trim().notEmpty()
        .isEmail()
        .withMessage('Please check your email format.')
};

const married = () => {
    return body('married')
        .if(body('married').exists())
        .replace(['true', 'True'], true)
        .replace(['false', 'False'], false)
        .isBoolean()
        .withMessage('A boolean value must be entered.');
};

const age = () => {
    return body('age')
        .if(body('age').exists())
        .isInt({gt: 0})
        .withMessage('Only available for ages 1+.');
};

const birthday = () => {
    return body('birthday')
        .if(body('birthday').exists())
        .isISO8601()
        .withMessage('Please check the date format.')
        .toDate()
        .custom((value) => {
            if (value < new Date()) return true;
            throw new Error('Birthday must be a date in the past.');
        });
};

const validate = (method, url) => {
    switch (`${method.toLowerCase()}|${url}`) {
        case 'put|/:id':
            return [
                nick(),
                email(),
                married(),
                age(),
                birthday(),
                validator,
            ];
        
        case 'patch|/:id/pw':
            return [
                password('old'),
                password('plain'),
                changePassword(),
                validator,
            ];
        
        default:
            console.error(`check ${method.toLowerCase()}|${url}`);
            return (req, res, next) => next();
    }
};

module.exports = {
    validate,
};