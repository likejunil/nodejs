const isLoggedIn = (req, res, next) => {
    /* passport 를 통해서 로그인을 했는지에 대한 검사 */
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};

const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인 상태입니다.');
        /* localhost:8001?error=메시지 */
        res.redirect(`/?error=${message}`);
    }
};

module.exports = {
    isLoggedIn,
    isNotLoggedIn,
};
