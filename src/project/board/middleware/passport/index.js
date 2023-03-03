const passport = require('passport');
const {User} = require('../../repository/sequelize/model/user.js');
const local = require('./strategy/local.js');
const kakao = require('./strategy/kakao.js');

/** session 에 저장 */
const serialize = () => {
    /* session.passport.user 생성 */
    passport.serializeUser((req, user, done) => {
        if (!user) return done(null);
        /* session.passport.user = user.id */
        /* 실제로 session.passport.user 에 저장할 내용을 지정 */
        /* 최대한 최소의 정보만을 session 에 저장 */
        return done(null, user.id)
    });
}

/** session 에서 불러오기 */
const deserialize = () => {
    /* id => req.session.passport.user */
    passport.deserializeUser(async (req, id, done) => {
        try {
            const user = await User.findOne({where: {id}});
            if (!user) {
                console.error(`User does not exist, id=|${id}|`);
                return done(null, false, {message: 'Try to login again.'});
            }
            
            /* req.user 에 user model 을 저장하여 사용 */
            /* req.user = user */
            /* done() 에 의해 다음 router 로 이동 */
            done(null, user);
            
        } catch (err) {
            done(err);
        }
    });
}

const initPassport = () => {
    serialize();
    deserialize();
    
    local();
    kakao();
}

/* deserialize 는 sequelize 에 의존한다. */
/* 따라서 initPassport 를 호출하는 시점을 주의해야 한다. */
module.exports = initPassport;
