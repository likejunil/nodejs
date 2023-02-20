const log = console.log;

module.exports = (req, res, next) => {
    log('session:', req.session);
    log('session.data:', req.session?.data);
    log('session.passport:', req.session?.passport);
    next();
};
