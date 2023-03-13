const {body} = require('express-validator');
const {validator} = require('./index.js');
const {uniqueId, password} = require('./common.js');
const {age, birthday, email, married} = require('./user.js');

const validate = (method, url) => {
    switch (`${method.toLowerCase()}|${url}`) {
        case 'post|/join':
            return [
                uniqueId(body, 'name'),
                password(body),
                email(body),
                married(body),
                age(body),
                birthday(body),
                validator,
            ];
        
        case 'post|/login':
            return [
                uniqueId(body),
                password(body),
                validator,
            ];
        
        default:
            return (req, res, next) => next();
    }
}

module.exports = {
    validate,
};
