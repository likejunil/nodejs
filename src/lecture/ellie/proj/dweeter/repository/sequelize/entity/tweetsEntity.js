import {DataTypes} from 'sequelize';
import sequelize from "../initSequelize.js";
import User from './usersEntity.js';

const Tweet = sequelize.define(
    'tweet',
    
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
    
    {
        timestamps: true,
    },
);

Tweet.belongsTo(User);

export default Tweet;
