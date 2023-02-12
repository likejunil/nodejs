const {DataTypes} = require('sequelize');
const sequelize = require('../initSequelize.js');

const File = sequelize.define(
    'File',
    {
        path: {
            type: DataTypes.STRING(256),
            allowNull: false,
            comment: '파일이 저장된 서버의 경로',
        },
        file: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: '파일이 서버에 저장된 UUIDv4 이름',
        },
        ext: DataTypes.STRING(16),
        name: {
            type: DataTypes.STRING(256),
            allowNull: false,
            comment: '실제 파일의 이름',
        },
        type: {
            type: DataTypes.STRING(64),
            comment: '파일의 종류',
        },
        
        count: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
            comment: '다운로드 받은 횟수',
        },
        
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'file',
    },
);

module.exports = File;
