const {User} = require('../repository/sequelize/model/user');
const {raiseError, setError} = require('../util/error.js');
const bcrypt = require('bcrypt');
const {bcrypt: {salt}} = require('../config/config.js');
const {succeed} = require('./common.js');
const {validateSort} = require('../middleware/validator/common.js');

const attributes = [
    'id',
    'uniqueId',
    'provider',
    'nick',
    'email',
    'age',
    'married',
    'birthday',
];

/* 유니크한 컬럼을 인자로 넘겨 단건의 사용자를 조회한다. */
/* id | uniqueId, provider */
const getUser = async (query) => {
    const {id, uniqueId, provider} = query;
    const where = {};
    /* id 만으로 조회 */
    if (id) {
        /* await User.findByPk(id); */
        where.id = id;
    }
    /* uniqueId, provider 의 조합으로만 조회 */
    else if (uniqueId && provider) {
        where.uniqueId = uniqueId;
        where.provider = provider;
    }
    
    return await User.findOne({where, attributes});
};

/* 다양한 컬럼을 인자로 받아서 복수의 사용자를 조회한다. */
const getUsers = async (query) => {
    const {uniqueId, provider, nick, email, age, married, birthday} = query;
    const {page, size, offset, limit, sort} = query;
    
    const where = {};
    if (uniqueId != null) where.uniqueId = uniqueId;
    if (provider != null) where.provider = provider;
    if (nick != null) where.nick = nick;
    if (email != null) where.email = email;
    if (age != null) where.age = age;
    if (married != null) where.married = married;
    if (birthday != null) where.birthday = birthday;
    
    const {count, rows: users} = await User.findAndCountAll({where, attributes, offset, limit, sort});
    return {count, page, size, users};
};

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
        .then(user => user.destroy({force: false}))
        .then(deleted => res.json(succeed(`User deleted, id=|${deleted.id}|`)))
        .catch(next);
};

/**
 * PATCH /user/:id/pw
 *  - provider === 'local' 인 사용자만 패스워드 변경 가능
 */
const changePassword = async (req, res, next) => {
    const {id} = req.params;
    const loaded = await User.findOne({
        where: {id},
        /* 추후 데이터를 갱신하기 위해서는 pk 를 조회해야 한다. */
        attributes: ['id', 'password'],
    });
    
    const {old, plain} = req.body;
    const match = await bcrypt.compare(old, loaded.password);
    if (!match) return next(setError(400, 'Password does not match.'));
    
    const password = await bcrypt.hash(plain, salt);
    loaded.update({password})
        .then(() => res.json(succeed(`User Updated, id=|${id}|`)))
        .catch(next);
};

module.exports = {
    getUser,
    findById,
    findUsers,
    updateById,
    deleteById,
    changePassword,
};
