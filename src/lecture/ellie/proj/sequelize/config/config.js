const dotenv = require('dotenv');
dotenv.config();

const required = (key, defaultValue) => {
    const value = process.env[key] ? process.env[key] : defaultValue;
    if (value === undefined) {
        throw new Error(`|${key}| 정보 누락, 확인 필요`);
    }
    return value;
};

const config = {
    sequelize: {
        host: required('MYSQL_HOST'),
        port: parseInt(required('MYSQL_PORT')),
        username: required('MYSQL_USER'),
        password: required('MYSQL_PASS'),
        database: required('MYSQL_DATABASE'),
        dialect: 'mysql',
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
        // logging: false,
    },
    
};

module.exports = config;
