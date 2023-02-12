const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

const Board = sequelize.define(
    'Board',
    {
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
        like: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
        },
        
        dislike: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
        },
        
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'board',
    },
);

module.exports = Board;
