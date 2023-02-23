const {User} = require('../repository/sequelize/model/user.js');
const {Post} = require('../repository/sequelize/model/post.js');

const main = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
        
    } catch (err) {
        console.error(err);
        next(err);
    }
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
