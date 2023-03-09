const {check, body, query} = require('express-validator');
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

const nick = (target, key, necessary = true) => {
    const what = target ?? check;
    const field = key ?? 'nick';
    return (necessary ? what(field) : what(field).if(what(field).exists()))
        .trim().notEmpty()
        .matches(nickRegex)
        .withMessage('You can use uppercase and lowercase letters, numbers, and underscores.(min:1, max:12)');
};

const email = (target, key, necessary = true) => {
    const what = target ?? check;
    const field = key ?? 'email';
    return (necessary ? what(field) : what(field).if(what(field).exists()))
        .trim().notEmpty()
        .isEmail()
        .withMessage('Please check your email format.')
};

const married = (target, key, necessary = true) => {
    const what = target ?? check;
    const field = key ?? 'married';
    return (necessary ? what(field) : what(field).if(what(field).exists()))
        .replace(['true', 'True'], true)
        .replace(['false', 'False'], false)
        .isBoolean()
        .withMessage('A boolean value must be entered.');
};

const age = (target, key, necessary = true) => {
    const what = target ?? check;
    const field = key ?? 'age';
    return (necessary ? what(field) : what(field).if(what(field).exists()))
        .isInt({gt: 0})
        .withMessage('Only available for ages 1+.');
};

const birthday = (target, key, necessary = true) => {
    const what = target ?? check;
    const field = key ?? 'birthday';
    return (necessary ? what(field) : what(field).if(what(field).exists()))
        .isISO8601()
        .withMessage('Please check the date format.')
        .toDate()
        .custom((value) => {
            if (value < new Date()) return true;
            throw new Error('Birthday must be a date in the past.');
        });
};

const ifnick = (t, k) => nick(t, k, false);
const ifemail = (t, k) => email(t, k, false);
const ifmarried = (t, k) => married(t, k, false);
const ifage = (t, k) => age(t, k, false);
const ifbirthday = (t, k) => birthday(t, k, false);

const validate = (method, url) => {
    switch (`${method.toLowerCase()}|${url}`) {
        case 'get|/':
            return [
                ifnick(query),
                ifemail(query),
                ifmarried(query),
                ifage(query),
                ifbirthday(query),
                validator,
            ];
        
        case 'put|/:id':
            return [
                ifnick(body),
                ifemail(body),
                ifmarried(body),
                ifage(body),
                ifbirthday(body),
                validator,
            ];
        
        case 'patch|/:id/pw':
            return [
                password(body, 'old'),
                password(body, 'plain'),
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
    nick,
    email,
    age,
    married,
    birthday,
};