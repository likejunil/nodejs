const {DataTypes} = require('sequelize');
const {sequelize, defaultOpt} = require('../initialize.js');

const User = sequelize.define(
    'User',
    {
        provider: {
            type: DataTypes.ENUM('local', 'kakao', 'naver', 'google'),
            allowNull: false,
            defaultValue: 'local',
            unique: 'provider-uniqueId',
        },
        
        /* local 의 경우 사용자가 정함, 로그인할 때 사용 */
        /* oauth 의 경우 제공 받음 */
        uniqueId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: 'provider-uniqueId',
        },
        
        /* 사용자에게 보여지는 이름 */
        /* local 의 경우 최초 uniqueId 와 같음 */
        /* oauth 의 경우 제공 받음 */
        nick: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        
        /* local 의 경우 필수 */
        password: DataTypes.STRING(256),
        
        email: DataTypes.STRING(32),
        age: DataTypes.INTEGER.UNSIGNED,
        married: DataTypes.BOOLEAN,
        birthday: DataTypes.DATEONLY,
    },
    {
        ...defaultOpt,
        tableName: 'user',
    },
);

const associate = (db) => {
    db.User.belongsToMany(db.Band, {
        through: 'user_band',
        foreignKey: 'bandId',
        as: 'User',
    })
}

module.exports = {
    User,
    associate,
};
