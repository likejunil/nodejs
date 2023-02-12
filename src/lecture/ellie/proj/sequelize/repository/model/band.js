const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

const Band = sequelize.define(
    'Band',
    {
        name: {
            type: DataTypes.STRING(32),
            unique: true,
            allowNull: false,
        },
        
        /* member 에 대한 참조 */
        manager: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        email: {
            type: DataTypes.STRING(32),
            validate: {isEmail: true,},
        },
        
        phone: DataTypes.STRING(16),
        
    },
    {
        timestamps: true,
        paranoid: true,
        understored: true,
        tableName: 'band',
    },
);

module.exports = Band;
