const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

const Family = sequelize.define(
    'Family',
    {
        name: {
            type: DataTypes.STRING(32),
            unique: true,
            allowNull: false,
        },
        
        head: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Member',
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'family',
    },
);

module.exports = Family;
