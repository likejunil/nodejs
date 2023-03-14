const {DataTypes} = require('sequelize');
const {sequelize, defaultOpt} = require('../initialize.js');

/* group */
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
        foreignKey: 'groupId',
        as: 'Member',
    })
    
    db.Band.belongsTo(db.User, {
        targetKey: 'id',
        foreignKey: 'ownerId',
        as: 'Manager',
    });
    
    db.Band.belongsToMany(db.Hashtag, {
        through: 'band_tag',
        foreignKey: 'bandId',
        as: 'Tag',
    });
};

module.exports = {
    Band,
    associate,
}
