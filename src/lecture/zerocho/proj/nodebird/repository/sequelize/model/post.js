const {sequelize, defaultConfig} = require('../initialize');
const {DataTypes} = require('sequelize');

const Post = sequelize.define(
    'Post',
    {
        content: {
            type: DataTypes.STRING(320),
            allowNull: false,
        },
        /* 이미지의 이름 */
        img: DataTypes.STRING(256),
    },
    {
        ...defaultConfig,
        tableName: 'post',
    },
);

const associate = (db) => {
    Post.belongsTo(db.User);
    Post.belongsToMany(db.HashTag, {
        through: 'PostHashTag',
    });
};

module.exports = {
    Post,
    associate,
};
