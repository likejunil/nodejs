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
            const provider = 'kakao';
            const email = kakao_account.email || id;
            const name = displayName || username;
            
            const user = await User.findOne({where: {email, provider}});
            if (user) {
                await user.update({email, name});
                return done(null, user);
            }
            
            const created = await User.create({
                email: email || id,
                provider,
                name, displayName,
            });
            return done(null, created);
            
        } catch (err) {
            done(err);
        }
    }
));

module.exports = kakao;
