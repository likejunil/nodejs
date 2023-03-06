const passport = require('passport');
const {Strategy} = require('passport-kakao');
const {kakao: config} = require('../../../config/config.js');
const {User} = require('../../../repository/sequelize/model/user.js');
const log = console.log;

const kakao = () => passport.use(new Strategy({
        clientID: config.clientKey,
        callbackURL: config.callback,
    },
    /* */
    async (accessToken, refreshToken, profile, done) => {
        /**
         * << profile >>
         * id: 2689880977,
         * username: "준일",
         * displayName: "준일",
         * _json: {
         *     id: 2689880977,
         *     connected_at: "2023-03-03T00:48:14Z",
         *     properties: {nickname: "준일"}
         *     kakao_account: {
         *         email: "likejunil@kakao.com",
         *         is_email_verified: true,
         *     },
         * }
         */
        try {
            const {id, username, displayName, _json: {kakao_account}} = profile;
            const uniqueId = id;
            const provider = 'kakao';
            const nick = displayName || username;
            const email = kakao_account.email;
            
            const user = await User.findOne({where: {uniqueId, provider}});
            if (user) {
                await user.update({email, nick});
                /* passport.serialize(func) 의 인자 func 호출 */
                /* session 에 저장할 데이터를 전달한다. */
                return done(null, {user, message: 'loaded'});
            }
            
            const created = await User.create({
                uniqueId,
                provider,
                nick,
            });
            /* passport.serialize(func) 의 인자 func 호출 */
            /* session 에 저장할 데이터를 전달한다. */
            return done(null, {user: created, message: 'created'});
            
        } catch (err) {
            done(err);
        }
    }
));

module.exports = kakao;
