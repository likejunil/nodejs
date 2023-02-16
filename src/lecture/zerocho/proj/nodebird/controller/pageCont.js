const main = (req, res, next) => {
    res.render('main', {
        title: 'NodeBird',
        twits: [],
    });
};

const join = (req, res, next) => {
    res.render('join', {title: '회원가입'});
};

const profile = (req, res, next) => {
    res.render('profile', {title: '내 정보'});
};

module.exports = {
    main,
    join,
    profile,
};
