const join = (req, res, next) => {
    res.send('가입');
};

const login = (req, res, next) => {
    res.send('로그인');
};

const logout = (req, res, next) => {
    res.send('로그아웃');
};

module.exports = {
    join,
    login,
    logout,
};
