const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const {User} = require('../../../repository/sequelize/model/user.js');

/* 실제로 인증을 진행하는 것은 전략이다. */
/* 인증을 마치면 결과를 done() 을 통해 전달한다. */
/* router 가 인증 결과를 받고 최종 처리를 한다. */
const local = () => passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    
    /**
     * 사용자 정보를 데이터베이스에서 불러온다.
     * 사용자가 존재한다면 패스워드를 검증한다.
     * 모두 검증되면 done 을 호출한다.
     *  -> done(system-error, user-info, assist-info);
     *  -> user 가 존재하지 않을 경우 user-info = false 로 할당
     */
    async (req, email, plain, done) => {
        const provider = 'local';
        try {
            const user = await User.findOne({where: {email, provider}});
            if (!user) {
                console.error('User does not exist.');
                return done(null, false, {message: 'Check the user information.'})
            }
            
            const match = await bcrypt.compare(plain, user.password);
            if (!match) {
                console.error(`Wrong password, id=|${user.id}|`);
                return done(null, false, {message: 'Check the user information.'});
            }
            
            return done(null, user);
            
        } catch (err) {
            return done(err);
        }
        
    },
));

module.exports = local;
