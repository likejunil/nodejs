const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    
    const error = new Error('It must be logged in.');
    error.status = 400;
    next(error);
}