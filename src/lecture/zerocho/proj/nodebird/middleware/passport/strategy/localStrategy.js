const passport = require('passport');
const bcrypt = require('bcrypt');
const {Strategy: LocalStrategy} = require('passport-local');
const {User} = require('../../../repository/sequelize/model/user.js');
const log = console.log;

/**
 * 전략은 여러가지 인증 방법 중에 하나를 의미
 * 인증 과정을 진행하고 인증 결과를 컨트롤러에게 돌려줌 (done 함수 사용)
 * done(시스템 에러, 사용자 정보, 로직 실패)
 */
const local = () => passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        log('로그인 진행(2): passport.use(LocalStrategy) 에 의해서 등록된 "local" 전략 실행');
        try {
            const user = await User.findOne({where: {email}});
            if (!user) {
                return done(null, false, {message: '해당 유저가 존재하지 않습니다.'});
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, {message: '비밀번호가 일치하지 않습니다.'})
            }
            return done(null, user);
            
        } catch (err) {
            console.error(err.message);
            return done(err);
        }
    },
));

module.exports = local;
