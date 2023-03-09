const {DataTypes} = require('sequelize');
const {sequelize, defaultOpt} = require('../initialize.js');

const Band = sequelize.define(
    'Band',
    {
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
        },
        desc: DataTypes.TEXT,
    },
    {
        ...defaultOpt,
        tableName: 'band',
    },
);

const associate = (db) => {
    db.Band.belongsToMany(db.User, {
        through: 'user_band',
        foreignKey: 'userId',
        as: 'Group',
    })
    db.Band.belongsTo(db.User, {
        foreignKey: 'ownerId',
        targetKey: 'id',
    });
};

module.exports = {
    Band,
    associate,
}
