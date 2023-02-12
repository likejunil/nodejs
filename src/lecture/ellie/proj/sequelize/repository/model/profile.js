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
        
        gender: {
            type: DataTypes.STRING(12),
            validate: {
                /* https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ */
                is: /^남자$|^여자$|^제3의 성$/,
            },
        },
        birthday: DataTypes.DATEONLY,
        age: DataTypes.TINYINT.UNSIGNED,
        married: DataTypes.BOOLEAN,
        phone: DataTypes.STRING(16),
        
        major: DataTypes.STRING(32),
        job: DataTypes.STRING(32),
        
        
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'profile',
    },
);

module.exports = Profile;
