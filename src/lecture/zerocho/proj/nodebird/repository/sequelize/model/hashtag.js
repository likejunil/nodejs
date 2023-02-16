const {sequelize, defaultConfig} = require('../initialize.js');
const {DataTypes} = require('sequelize');

const HashTag = sequelize.define(
    'HashTag',
    {
        tag: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
        },
    },
    {
        ...defaultConfig,
        tableName: 'hashtag',
    },
);

const associate = (db) => {
    HashTag.belongsToMany(db.Post, {
        through: 'PostHashTag',
    });
};

module.exports = {
    HashTag,
    associate,
};
