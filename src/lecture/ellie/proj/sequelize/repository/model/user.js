const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

/**
 * << DataTypes >>
 * - BOOLEAN
 * - TINYINT
 * - INTEGER
 * - BIGINT
 * - FLOAT
 * - DOUBLE
 * - DECIMAL
 * - INTEGER.UNSIGNED
 * - INTEGER.ZEROFILL
 *
 * - STRING()
 * - TEXT
 * - DATE
 * - DATEONLY
 * - UUID
 *
 * defaultValue:
 * - Sequelize.NOW,
 * - DataTypes.UUIDV4,
 */

/* 테이블을 표현하는 모델 생성 */
const User = sequelize.define(
    'User',
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
            type: DataTypes.STRING(128),
            allowNull: false,
            /* unique 를 걸면 저절로 index 가 생성이 된다. */
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        
        password: {
            type: DataTypes.STRING(256),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        
        /* 기본적으로 null 허용, 기본값은 null */
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
                /* unique 는 index 가 생성되지만, index 가 꼭 unique 일 필요는 없다. */
                unique: false,
            }
        ],
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        tableName: 'user',
    },
);

module.exports = User;
