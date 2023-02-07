const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

/* 테이블을 표현하는 모델 생성 */
const Member = sequelize.define(
    'Member',
    {
        /*
        id 컬럼은 생략이 가능하다.
        sequlize 에서 저절로 생성해준다.
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
         */
        
        email: {
            type: DataTypes.STRING(32),
            allowNull: false,
            /* unique 를 걸면 저절로 index 가 생성이 된다. */
            unique: true,
        },
        
        password: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        
        name: DataTypes.STRING(32),
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        indexes: [
            {
                fields: ['name'],
                name: 'idx_member_name',
                unique: false,
            }
        ],
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        tableName: 'member',
    },
);

module.exports = Member;
