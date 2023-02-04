import {DataTypes} from 'sequelize';

const modelName = 'Tweet';
const tableName = 'tweets';
const charset = 'utf8mb4';
const collate = 'utf8mb4_unicode_ci';

export default (sequelize) => {
    const Tweet = sequelize.define(
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
            
            text: {
                type: DataTypes.TEXT,
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
    
    /*
    이 코드가 왜 적용되지 않는지 모르겠다.
    Tweet.associate = models => {
        Tweet.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id'});
    };
     */
    
    return Tweet;
};
