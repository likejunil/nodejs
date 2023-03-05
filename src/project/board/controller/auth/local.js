const bcrypt = require('bcrypt');
const {bcrypt: {salt}} = require('../../config/config.js');
const passport = require('passport');
const {User} = require('../../repository/sequelize/model/user.js');
const {raiseError} = require('../../util/error.js');

/**
 * << 해당 조건의 사용자가 없음을 확인하라 >>
 * uniqueId, provider 의 조합은 사용자를 판별할 수 있는 기준이다.
 * 해당 조건의 사용자가 존재하면 에러를 발생시킨다.
 *
 * @param uniqueId
 * @param provider
 */
const checkUserNotExist = async (uniqueId, provider) => {
    const user = await User.findOne({where: {uniqueId, provider}});
    if (user) raiseError(400, `User already exists. id=|${uniqueId}|`);
};

/**
 * << 주어진 정보로 사용자를 생성하라 >>
 *
 * @param info
 * @returns 생성한 User Model
 */
const createAccount = async (info) => {
    const {password: plain} = info;
    if (!plain) raiseError(400, "Please enter your password.");
    const password = await bcrypt.hash(plain, salt);
    /* undefined 는 null 로 입력된다. */
    return await User.create({...info, password});
};

/**
 * << 사용자 생성을 위한 정보만을 필터링하라 >>
 * @param input
 * @returns {name, email, password, age, married, birthday}
 */
const filterJoinField = (input) => {
    const {uniqueId, password, email, age, married, birthday} = input;
    return {uniqueId, password, email, age, married, birthday};
}

/**
 * << router >>
 * /auth/join
 */
const join = async (req, res, next) => {
    const fields = filterJoinField(req.body);
    const {uniqueId} = fields;
    const provider = 'local';
    
    checkUserNotExist(uniqueId, provider)
        .then(() => createAccount({...fields, provider, nick: uniqueId}))
        .then(created => res.json({message: `User created successfully, id=|${created?.id}|`}))
        .catch(next);
};

/**
 * << router >>
 * /auth/login
 */
const login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        /*  시스템 에러 */
        if (err) {
            err.status = 500;
            return next(err);
        }
        
        /* 사용자 없음 혹은 패스워드 불일치 */
        if (!user) {
            const error = new Error(info.message);
            error.status = 400;
            return next(error);
        }
        
        /* passport.serialize() 호출 */
        /* session 에 저장할 정보를 첫번째 인자로 전달 */
        /* session 에 정보 저장 후 req.login() 호출됨 */
        req.login(user, (err) => {
            if (err) {
                err.status = 500;
                return next(err);
            }
            
            res.json({message: 'You are logged in.'});
        });
    })(req, res, next);
};

/**
 * << router >>
 * /auth/logout
 */
const logout = (req, res, next) => {
    /* req.logout() 에 의해 req.session.passport 의 내용이 삭제 */
    /* req.logout(func) 의 인자 func 는 passport.deserialize 가 종료된 후 호출 */
    req.logout(() => {
        res.json({message: 'You are logged out.'});
    });
};

module.exports = {
    join,
    login,
    logout,
};
