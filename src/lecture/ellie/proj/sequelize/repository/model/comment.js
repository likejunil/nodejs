const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

const Comment = sequelize.define(
    'Comment',
    {
        body: {
            type: DataTypes.STRING(1024),
            allowNull: false,
        },
        
        agree: DataTypes.INTEGER.UNSIGNED,
        disagree: DataTypes.INTEGER.UNSIGNED,
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'comment',
    },
);

module.exports = Comment;
