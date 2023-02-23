const {Router} = require('express');
const {main, join, profile, hashtag} = require('../controller/pageCont.js');
const {isLoggedIn, isNotLoggedIn} = require('../middleware/passport/checkConnect.js');
const {User} = require('../repository/sequelize/model/user.js');

const router = Router();

/* 해당 라우터의 요청에 대하여 공통적으로 처리해야 할 사항 */
router.use(async (req, res, next) => {
    /* passport 의 deserialize 에서 한꺼번에 구하는 방법도 있다. */
    /* 하지만 req.user 의 크기가 커진다는 단점을 고려해야 한다. */
    let user = req.user;
    if (user) {
        user = await User.findOne({
            where: {id: user.id},
            include: [
                {
                    model: User,
                    attributes: ['id', 'nick'],
                    as: 'Followings',
                },
                {
                    model: User,
                    attributes: ['id', 'nick'],
                    as: 'Followers',
                },
            ],
        });
        
        if (!user) {
            return res.status(500).send('...');
        }
    }
    
    res.locals.user = user;
    res.locals.followerCount = user?.Followers?.length || 0;
    res.locals.followingCount = user?.Followings?.length || 0;
    res.locals.followingIdList = user?.Followings?.map(m => m.id) || [];
    next();
});

/**
 * "/": 최초 진입 페이지
 * "/join": 회원 가입 페이지
 * "/profile": 기본 정보 페이지
 */
router.get("/", main);
router.get("/join", isNotLoggedIn, join);
router.get("/profile", isLoggedIn, profile);
router.get("/hashtag", isLoggedIn, hashtag);

module.exports = router;
