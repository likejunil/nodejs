const {User} = require("./sequelize/model/user");

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

const createUser = async (body, tr) => {
    return User.create(body, tr);
}

/* 유니크한 컬럼을 인자로 넘겨 단건의 사용자를 조회한다. */
/* id | uniqueId, provider */
const getUser = async (query) => {
    const {id, uniqueId, provider} = query;
    
    /* id 만으로 조회 */
    if (id) return await User.findByPk(id, {attributes});
    
    const where = {};
    /* uniqueId, provider 의 조합으로만 조회 */
    if (uniqueId && provider) {
        where.uniqueId = uniqueId;
        where.provider = provider;
    }
    
    return await User.findOne({where, attributes});
};

/* 다양한 컬럼을 인자로 받아서 복수의 사용자를 조회한다. */
const getUsers = async (query) => {
    const {uniqueId, provider, nick, email, age, married, birthday} = query;
    const {page, size, offset, limit, sort: order} = query;
    
    const where = {};
    if (uniqueId != null) where.uniqueId = uniqueId;
    if (provider != null) where.provider = provider;
    if (nick != null) where.nick = nick;
    if (email != null) where.email = email;
    if (age != null) where.age = age;
    if (married != null) where.married = married;
    if (birthday != null) where.birthday = birthday;
    
    const {count, rows: users} = await User.findAndCountAll({attributes, where, order, limit, offset});
    return {count, page, size, users};
};

const getPassword = async (query) => {
    const {id} = query;
    return await User.findByPk(id, {attributes: ['id', 'password'],});
};

module.exports = {
    createUser,
    getUser,
    getUsers,
    getPassword,
};
