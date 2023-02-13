const dotenv = require('dotenv');
dotenv.config();

const requried = (key, defaultValue) => {
    const value = process.env[key];
    if (value == null) {
        if (defaultValue === undefined) {
            throw new Error(`|${key}|에 해당하는 환경변수가 존재하지 않습니다.`);
        }
        return defaultValue;
    }
    return value;
};

const config = {
    sequelize: {
        host: '127.0.0.1',
        port: '3306',
        user: 'june1',
        pass: 'qweQWE123!@#',
        database: 'nodebird',
    },
    
    morgan: {
        level: 'dev',
    },
};

module.exports = config;
