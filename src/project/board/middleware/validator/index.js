const {validationResult} = require('express-validator');
const {setError} = require('../../util/error.js');

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(setError(400, 'Please check the input value.', errors.array()));
    }
    next();
};

module.exports = {
    validator,
};
