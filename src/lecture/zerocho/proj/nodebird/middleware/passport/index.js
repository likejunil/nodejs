const passport = require('passport');
const local = require('./strategy/localStrategy.js');
const kakao = require('./strategy/kakaoStrategy.js');
const {User} = require('../../repository/sequelize/model/user.js');
const log = console.log;

const serialize = () => passport.serializeUser((req, user, done) => {
    log('로그인 진행(5): passport.serializeUser(func) 의 func 에 진입');
    /* 사용자 session 생성 */
    /* req.session.passport.user = 1 */
    log('로그인 진행(6): req.session.passport.user 생성');
    done(null, user.id);
});

const deserialize = () => passport.deserializeUser(async (req, id, done) => {
    log('로그인 진행(9): passport.deserializeUser() 에 진입');
    try {
        log('로그인 진행(10): session 에 저장되어 있던 id 로 User 정보 불러옴');
        const user = await User.findOne({where: {id}});
        log('로그인 진행(11): req.user 를 생성');
        /* req.user 에 user 를 할당 */
        done(null, user);
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});

const initPassport = () => {
    serialize();
    deserialize();
    
    /* 인증 전략 */
    local();
    kakao();
}

/* deserialize() 에서 sequelize 의 Model 을 사용한다. */
/* 즉, passport 는 sequelize 에 의존한다. */
/* 따라서 passport 초기화는 sequelize 초기화가 완료된 후 진행한다. */
module.exports = initPassport;
