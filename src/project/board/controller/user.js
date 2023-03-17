const bcrypt = require('bcrypt');
const {bcrypt: {salt}} = require('../config/config.js');
const {succeed} = require('./common.js');
const {raiseError} = require('../util/error.js');
const {getPassword, getUser, getUsers} = require('../repository/user.js');
const {getBand} = require('../repository/band.js');

/* 사용자가 존재하지 않으면 에러를 발생시킨다. */
const checkUser = (user) =>
    user ?? raiseError(400, "User does not exist.");

/* 사용자가 local 사용자가 아니면 에러를 발생시킨다. */
const checkLocalUser = (user) =>
    (user && user.provider === 'local') ? user : raiseError(400, "It must be a local user");

const filterModifyField = (input) => {
    const {nick, email, age, married, birthday} = input;
    return {nick, email, age, married, birthday};
}

/**
 * GET /user
 */
const findUsers = async (req, res, next) => {
    const query = req.query;
    getUsers(query)
        .then(data => {
            const {count, page, size, users} = data;
            res.json(succeed(users, page, size, count));
        })
        .catch(next);
};

/**
 * GET /user/:id
 */
const findById = async (req, res, next) => {
    const {id} = req.params;
    getUser({id})
        .then(user => res.json(succeed(checkUser(user))))
        .catch(next);
}

/**
 * PUT /user/:id
 *  - provider === 'local' 인 사용자만 정보 갱신 가능
 *  - nick, email, age, married, birthday
 */
const updateById = async (req, res, next) => {
    const {id} = req.params;
    getUser({id})
        .then(checkLocalUser)
        .then(user => {
            const fileds = filterModifyField(req.body);
            /* undefined 항목은 query 에서 제외된다. */
            return user.update({...fileds});
        })
        .then(user => res.json(succeed(user)))
        .catch(next);
};

/**
 * DELETE /user/:id
 *  - provider === 'local' 인 사용자만 삭제 갱신 가능
 */
const deleteById = async (req, res, next) => {
    const {id} = req.params;
    getUser({id})
        .then(checkLocalUser)
        /* hard delete(완전하게 삭제)를 하려면 force: true */
        .then(user => {
            // todo 2023.0317
            //  - 세션을 삭제하고 로그아웃을 진행해야 한다.
            user.destroy({force: false});
        })
        .then(deleted => res.json(succeed(`User deleted, id=|${deleted.id}|`)))
        .catch(next);
};

/**
 * PATCH /user/:id/pw
 *  - provider === 'local' 인 사용자만 패스워드 변경 가능
 */
const changePassword = async (req, res, next) => {
    try {
        const {id} = req.params;
        const loaded = await getPassword({id});
        
        const {old, plain} = req.body;
        const match = await bcrypt.compare(old, loaded.password);
        if (!match) raiseError(400, 'Password does not match.');
        
        const password = await bcrypt.hash(plain, salt);
        await loaded.update({password});
        res.json(succeed(`User Updated, id=|${id}|`));
        
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /user/band/:id
 */
const joinBand = async (req, res, next) => {
    const {id: bandId} = req.params;
    const user = req.user;
    getBand(bandId)
        .then(band => user.addGroups(band))
        .then(data => {
            /* 이미 가입되어 있는 band 라면 undefined */
            /* 가입되었다면 user_band 의 항목을 배열에 담아 반환 */
            res.json(succeed(data
                ? 'You have successfully signed up.'
                : 'You are already signed up.'));
        })
        .catch(next)
}

/**
 * DELETE /user/band/:id
 */
const leaveBand = (req, res, next) => {
    const {id: bandId} = req.params;
    const user = req.user;
    getBand({bandId})
        .then(band => user.removeGroups(band))
        .then(data => {
            /* 삭제한 band 의 수를 반환한다. */
            res.json(succeed(data === 0
                ? 'You are not a member of a group.'
                : 'You have successfully unsubscribed.'));
        })
        .catch(next);
}

module.exports = {
    findById,
    findUsers,
    updateById,
    deleteById,
    changePassword,
    joinBand,
    leaveBand,
};
