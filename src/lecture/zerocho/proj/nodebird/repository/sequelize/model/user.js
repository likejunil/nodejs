const {sequelize, defaultConfig} = require('../initialize.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define(
    'User',
    {
        provider: {
            type: DataTypes.STRING(16),
            defaultValue: 'local',
            allowNull: false,
            unique: 'provider_email',
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: false,
            /* null 중복은 가능한가? */
            unique: 'provider_email',
        },
        password: DataTypes.STRING(256),
        snsId: DataTypes.STRING(64),
        nick: DataTypes.STRING(32),
    },
    {
        ...defaultConfig,
        tableName: 'user',
    },
);

/* 모델이 모두 생성된 후 연결 관계를 생성해야 한다. */
/* 따라서 함수로 export 하여 실행 타이밍을 넘긴다. */
const associate = (db) => {
    User.hasMany(db.Post);
    User.belongsToMany(User, {
        through: 'follow',
        foreignKey: 'followingId',
        /* belongsToMany 에서의 복수표현 주의 */
        as: 'Followers',
    });
    User.belongsToMany(User, {
        through: 'follow',
        foreignKey: 'followerId',
        /* belongsToMany 에서의 복수표현 주의 */
        as: 'Followings',
    });
}

module.exports = {
    User,
    associate,
};
