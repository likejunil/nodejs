const {sequelize, defaultConfig} = require('../initialize.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define(
    'User',
    {
        provider: {
            type: DataTypes.STRING(16),
            defaultValue: 'local',
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: true,
            /* null 중복은 가능한가? */
            unique: true,
        },
        snsId: DataTypes.STRING(64),
        password: DataTypes.STRING(256),
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
        /* 내가 누구를!! 따르고 있나 */
        through: 'Follow',
        foreignKey: 'followingId',
        as: 'Followers',
    });
    User.belongsToMany(User, {
        /* 누가 나를!! 따르고 있나 */
        through: 'Follow',
        foreignKey: 'followerId',
        as: 'Followings',
    });
}

module.export = {
    User,
    associate,
};
