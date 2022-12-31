import {DataTypes} from 'sequelize';
import sequelize from '../initSequelize.js';

const User = sequelize.define(
    'user',
    
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
    
    {
        timestamps: true,
    },
);

export default User;
