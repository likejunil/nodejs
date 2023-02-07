const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

const Profile = sequelize.define(
    'Profile',
    {
        joinDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.DATE.now,
        },
        
        /* 기본적으로 null 허용, 기본값은 null */
        phone: DataTypes.STRING(16),
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'profile',
    },
);

module.exports = Profile;
