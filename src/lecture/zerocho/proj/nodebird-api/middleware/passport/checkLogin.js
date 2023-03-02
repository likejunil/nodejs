const {setError} = require('../../util/error.js');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    next(setError(400, 'It must be logged in.'));
};

const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    next(setError(400, 'You are already logged in.'));
};

module.exports = {
    isLoggedIn,
    isNotLoggedIn,
};
