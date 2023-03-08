const {body} = require('express-validator');
const {validator} = require('./index.js');
const {uniqueId, password} = require('./common.js');

const email = () => {
    return body('email').trim()
        .isEmail()
        .withMessage('Please check your email format.');
};

const married = () => {
    return body('married')
        .isBoolean()
        .withMessage('A boolean value must be entered.');
};

const age = () => {
    return body('age')
        .isInt({gt: 0})
        .withMessage('Only available for ages 1+.');
};

const birthday = () => {
    return body('birthday')
        .isISO8601()
        .withMessage('Please check the date format.')
        .toDate()
        .custom((value) => {
            if (value < new Date()) return true;
            throw new Error('Birthday must be a date in the past.');
        })
    
};

const validate = (method, url) => {
    switch (`${method.toLowerCase()}|${url}`) {
        case 'post|/join':
            return [
                uniqueId('name'),
                password(),
                email(),
                married(),
                age(),
                birthday(),
                validator,
            ];
        
        case 'post|/login':
            return [
                uniqueId(),
                password(),
                validator,
            ];
        
        default:
            console.error(`check ${method.toLowerCase()}|${url}`);
            return (req, res, next) => next();
    }
}

module.exports = {
    validate,
};
