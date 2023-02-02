import {DataTypes} from 'sequelize';

/**
 * 모델은 데이터베이스의 테이블에 대한 정보를 Sequelize 에게 알려주기 위한 데이터 구조다.
 * 모델을 정의하는 방법은 크게 2가지다.
 *  - sequelize.define(modelName, attributes, options)
 *  - init(attributes, options)
 */

/**
 * << DataTypes >>
 * - BOOLEAN
 * - TINYINT
 * - INTEGER
 * - BIGINT
 * - FLOAT
 * - DOUBLE
 * - DECIMAL
 *
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

const modelName = 'User';
const tableName = 'users';
const charset = 'utf8mb4';
const collate = 'utf8mb4_unicode_ci';

export default (sequelize) => {
    const User = sequelize.define(
        /* model name */
        modelName,
        
        /* attributes(columns) */
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            
            username: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: true,
            },
            
            password: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            
            name: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            
            email: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
        },
        
        /* options */
        {
            timestamps: true,
            underscored: true,
            paranoid: true,
            charset,
            collate,
            tableName,
            modelName,
        },
    );
    
    User.associate = (models) => {
        User.hasMany(models.Tweet, {foreignKey: 'user_id', sourceKey: 'id'});
    };
    
    return User;
}
