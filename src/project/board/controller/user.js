const {User} = require('../repository/sequelize/model/user');
const {raiseError, setError} = require('../util/error.js');
const bcrypt = require('bcrypt');
const {bcrypt: {salt}} = require('../config/config.js');

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

const order = [
    ['createdAt', 'DESC'],
];

/* 유니크한 컬럼을 인자로 넘겨 단건의 사용자를 조회한다. */
/* id | uniqueId, provider */
const getUser = async (query) => {
    const {id, uniqueId, provider} = query;
    const where = {};
    /* id 만으로 조회 */
    if (id) {
        where.id = id;
    }
    /* uniqueId, provider 의 조합으로만 조회 */
    else if (uniqueId && provider) {
        where.uniqueId = uniqueId;
        where.provider = provider;
    }
    
    return await User.findOne({where, attributes, order});
};

/* 다양한 컬럼을 인자로 받아서 복수의 사용자를 조회한다. */
const getUsers = async (query) => {
    const {uniqueId, provider, nick, email, age, married, birthday} = query;
    const where = {};
    if (uniqueId) where.uniqueId = uniqueId;
    if (provider) where.provider = provider;
    if (nick) where.nick = nick;
    if (email) where.email = email;
    if (age) where.age = age;
    if (married) where.married = married;
    if (birthday) where.birthday = birthday;
    return await User.findAll({where, attributes, order});
};

const getAllUsers = async () =>
    await User.findAll({attributes, order});

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
 * GET /user/:id
 */
const findById = async (req, res, next) => {
    const {id} = req.params;
    const call = id ? () => getUser({id}) : () => getAllUsers();
    call()
        .then(user => res.json(checkUser(user)))
        .catch(next);
}

/**
 * GET /user
 */
const findUsers = async (req, res, next) => {
    const query = req.query;
    getUsers(query)
        .then(users => res.json(users ?? []))
        .catch(next);
};

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
        .then(user => res.json(user))
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
        .then(deleted => res.json(`User deleted, id=|${deleted.id}|`))
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
        .then(() => res.json({message: 'Updated.'}))
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
