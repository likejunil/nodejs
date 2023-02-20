const bcrypt = require('bcrypt');
const passport = require('passport');
const {User} = require('../../repository/sequelize/model/user.js');
const {bcrypt: {salt}} = require('../../config/config.js');
const log = console.log;

/**
 * << 계정 생성 >>
 * 1. 해당 email 의 사용자가 존재하는지 확인
 * 2. 있다면 에러 url redirect, return (에러 메시지)
 * 3. 패스워드 생성, 계정 생성
 * 4. 성공적으로 계정을 생성하면 / redirect
 */
const join = async (req, res, next) => {
    const {email, nick, password: plain} = req.body;
    try {
        /* findOne(), findAll() 은 대상이 없으면 null 반환 */
        const user = await User.findOne({where: {email}});
        if (user) {
            return res.redirect('/join?error=exist')
        }
        const password = await bcrypt.hash(plain, salt);
        const saved = await User.create({email, nick, password});
        log(`email=|${saved.email}| 계정 생성 성공`);
        return res.redirect('/');
        
    } catch (err) {
        console.error('ERROR => 계정 생성 실패:', err);
        next(err);
    }
};

/**
 * 인증의 시작은 컨트롤러에서..
 * 어떤 인증 전략을 사용할 것인가 선택
 * 전략이 반환하는 값으로 인증 결과 처리
 */
const login = (req, res, next) => {
    log('로그인 진행(1): 로그인 라우터 시작, passport.authenticate("local", done) 호출');
    passport.authenticate('local', (err, user, info) => {
        log('로그인 진행(3): local 전략에서 authenticate 함수의 인자 done() 호출');
        /* 시스템 에러 */
        if (err) {
            console.error(err);
            next(err);
        }
        
        /* 해당 유저가 없거나 패스워드가 일치하지 않거나 */
        if (!user) {
            res.redirect(`/?loginError=${info.message}`)
        }
        
        log('로그인 진행(4): done 내부에서 req.login() 호출');
        return req.login(user, (error) => {
            log('로그인 진행(7): req.login(user, func) 의 func() 이 호출되었음');
            if (error) {
                console.error(error);
                next(error);
            }
            log('로그인 진행(8): client 에게 "/" 으로 redirect');
            res.redirect('/');
        });
        
    })(req, res, next);
    log('로그인 진행(9): 로그인 라우터 종료');
};

const logout = (req, res, next) => {
    req.logout(() => {
        res.redirect('/');
    });
};

module.exports = {
    join,
    login,
    logout,
};
