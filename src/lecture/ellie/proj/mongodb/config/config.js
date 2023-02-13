const dotenv = require('dotenv');
dotenv.config();

const required = (key, defaultValue) => {
    const target = process.env[key];
    if (target == null) {
        if (defaultValue === undefined) {
            throw new Error(`|${key}|에 해당하는 값이 존재하지 않습니다.`);
        }
        return defaultValue;
    }
    return target;
}

const config = {
    mongodb: {
        host: required('MONGO_HOST', 'localhost'),
        port: parseInt(required('MONGO_PORT', 27017)),
        user: required('MONGO_USER'),
        pass: required('MONGO_PASS'),
        database: required('MONGO_DB'),
    },
};

module.exports = config;
