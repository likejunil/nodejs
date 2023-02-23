const {User} = require('../repository/sequelize/model/user.js');
const {Post} = require('../repository/sequelize/model/post.js');
const {Hashtag} = require('../repository/sequelize/model/hashtag.js');

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

const hashtag = async (req, res, next) => {
    /* 요청 쿼리가 올라왔는가 */
    const {hashtag: tag} = req.query;
    if (!tag) {
        return res.redirect('/');
    }
    
    /* 검색 데이터가 존재하는가 */
    const load = await Hashtag.findOne({where: {tag}});
    if (!load) {
        return res.redirect('/');
    }
    
    /* 올바른 요청과 응답 결과 */
    const posts = await load.getPosts({
        include: [{
            model: User,
            attributes: ['id', 'nick'],
        }],
        order: [['createdAt', 'DESC']],
    });
    
    res.render('main', {
        title: `${tag} | NodeBird`,
        twits: posts,
    });
};

module.exports = {
    main,
    join,
    profile,
    hashtag,
};
