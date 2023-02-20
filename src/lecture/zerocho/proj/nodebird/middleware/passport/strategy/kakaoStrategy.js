const passport = require('passport');
const {passport: {kakao: config}} = require('../../../config/config.js');
const {Strategy: KakaoStrategy} = require('passport-kakao');
const {User} = require('../../../repository/sequelize/model/user.js');
const log = console.log;

/* client 가 kakao 로부터 받은 코드값을 보내온다. */
/* 받은 코드값으로 kakao 에 accessToken 등 정보를 요청하면.. 전략의 callback 함수가 실행된다. */
const kakao = () => {
    passport.use(new KakaoStrategy({
        clientID: config.clientID,
        callbackURL: config.callback,
    }, async (accessToken, refreshToken, profile, done) => {
        /* profile 은 카카오에서 보내주는 정보이기 때문에 불시에 구조가 변할 수 있다. */
        /* 따라서 profile 를 다룰 때 예외처리를 해야한다. */
        try {
            log(profile);
            const user = await User.findOne({where: {snsId: profile.id, provider: 'kakao'}});
            if (user) {
                return done(null, user);
            } else {
                const created = await User.create({
                    snsId: profile.id,
                    nick: profile.username,
                    email: profile._json?.kakao_account?.email ?? profile.id,
                    provider: 'kakao',
                })
                done(null, created);
            }
            
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
};

module.exports = kakao;
