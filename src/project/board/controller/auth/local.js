const bcrypt = require('bcrypt');
const {bcrypt: {salt}} = require('../../config/config.js');
const passport = require('passport');
const {User} = require('../../repository/sequelize/model/user.js');
const {setError, raiseError} = require('../../util/error.js');
const {succeed} = require('../common.js');

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

/* 패스워드 생성을 위한 조건 검사 */
const generatePassword = async (plain) => {
    // todo
    //  - 정규표현식을 활용하여 패스워드 조건을 검사
    //  - https://heropy.blog/2018/10/28/regexp/
    //  - capturing 이해하는데 실패.. ㅜㅠ
    if (!plain) raiseError(400, "Please check your password.");
    return await bcrypt.hash(plain, salt);
}

/**
 * << 주어진 정보로 사용자를 생성하라 >>
 * @param info
 * @returns 생성한 User Model
 */
const createAccount = async (info) => {
    /* password 는 필수요소이며 조건을 검사해야 한다. */
    const {password: plain} = info;
    const password = await generatePassword(plain)
    /* undefined 는 query 에서 제외된다. */
    return await User.create({...info, password});
};

/**
 * << 사용자 생성을 위한 정보만을 필터링하라 >>
 * @param input
 * @returns {uniqueId, password, nick, email, age, married, birthday}
 */
const filterJoinField = (input) => {
    const {name, password, email, age, married, birthday} = input;
    return {uniqueId: name, password, nick: name, email, age, married, birthday};
}

/**
 * POST /auth/join
 */
const join = async (req, res, next) => {
    const fields = filterJoinField(req.body);
    const {uniqueId} = fields;
    const provider = 'local';
    
    /* 사용자의 유일성은 uniqueId, provider 의 조합으로 결정 */
    checkUserNotExist(uniqueId, provider)
        .then(() => createAccount({...fields, provider}))
        .then(created => res.json(succeed(`User created successfully, id=|${created?.id}|`)))
        .catch(next);
};

/**
 * POST /auth/login
 *
 * 1. 로그인 요청이 auth.login() 라우터에 전달된다.
 * 2. auth.login() 라우터는 passport.authenticate() 를 통해 인증 전략을 선택하고 인증 과정을 맡긴다.
 * 3. passport.use() 에 의해 등록된 인증 전략이 실행된다.
 * 4. 인증 전략이 실행되고 결과가 passport.authenticate() 의 콜백으로 돌아온다.
 * 5. 인증 전략 결과를 받고 처리를 한다.
 * 6. 인증이 성공했을 경우 session 에 저장하기 위해 passport.serialize() 의 콜백을 호출한다.
 * 7. 필요한 정보가 가공 및 선택되어 session 에 저장된다.
 * 8. 저장 성공 유무를 passport.authenticate() 에 돌려준다.
 * 9. 사용자에게 로그인 성공 여부를 응답한다.
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
            return next(setError(400, info.message));
        }
        
        /* req.login() 이 passport.serialize(func) 에 인자로 넘겨준 func 를 호출 */
        /* req.log(user) 에 전달한 user 인자가 func(user) 의 인자로 전달됨 */
        /* 넘겨진 인자로부터 session 에 저장할 데이터를 가공 */
        /* session 에 정보 저장 후 req.login(func) 에 인자로 전달된 func 이 호출됨 */
        req.login({user, type: 'local'}, (err) => {
            if (err) {
                err.status = 500;
                return next(err);
            }
            
            res.json(succeed('You are logged in.'));
        });
    })(req, res, next);
};

/**
 * POST /auth/logout
 */
const logout = (req, res, next) => {
    /* req.logout() 에 의해 req.session.passport 의 내용이 삭제 */
    /* req.logout(func) 의 인자 func 는 passport.deserialize 가 종료된 후 호출 */
    req.logout(() => {
        res.json(succeed('You are logged out.'));
    });
};

module.exports = {
    join,
    login,
    logout,
};
