const {sequelize, defaultConfig} = require('../initialize.js');
const {DataTypes} = require('sequelize');

const Hashtag = sequelize.define(
    'Hashtag',
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
        paranoid: false,
    },
);

const associate = (db) => {
    Hashtag.belongsToMany(db.Post, {through: 'postHashtag',});
};

module.exports = {
    Hashtag,
    associate,
};
