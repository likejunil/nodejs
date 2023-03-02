const {DataTypes} = require('sequelize');
const {sequelize, defaultOpt} = require('../initialize.js');

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: 'provider-email',
        },
        provider: {
            type: DataTypes.ENUM('local', 'kakao', 'naver', 'google'),
            allowNull: false,
            unique: 'provider-email',
            defaultValue: 'local',
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        password: DataTypes.STRING(256),
        age: DataTypes.INTEGER.UNSIGNED,
        married: DataTypes.BOOLEAN,
        birthday: DataTypes.DATEONLY,
    },
    {
        ...defaultOpt,
        tableName: 'user',
    },
);

const associate = (db) => {
    db.User.belongsToMany(db.Band, {
        through: 'user_band',
        foreignKey: 'bandId',
        as: 'User',
    })
}

module.exports = {
    User,
    associate,
};
