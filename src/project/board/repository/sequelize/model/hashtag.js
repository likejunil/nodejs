const {DataTypes} = require('sequelize');
const {sequelize, defaultOpt} = require('../initialize.js');

const Hashtag = sequelize.define(
    'Hashtag',
    {
        tag: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
        }
    },
    {
        ...defaultOpt,
        tableName: 'hashtag',
    },
);

const associate = (db) => {
    db.Hashtag.belongsToMany(db.Band, {
        through: 'band_tag',
        foreignKey: 'tagId',
        as: 'Groups',
    });
}

module.exports = {
    Hashtag,
    associate,
};
