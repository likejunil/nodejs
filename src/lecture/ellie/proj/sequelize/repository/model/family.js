const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

const Family = sequelize.define(
    'Family',
    {
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: 'family_head',
        },
        
        /* member 에 대한 참조 */
        head: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'family_head',
            /*
            서로간의 순환 참조가 일어나기 때문에 할 수 없다.
            references: {
                model: 'User',
                key: 'id',
            },
             */
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
