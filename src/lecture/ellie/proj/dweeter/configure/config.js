import dotenv from 'dotenv';

dotenv.config();

/**
 * 환경설정 값을 읽을 때, 기본값도 존재하지 않고 설정값도 존재하지 않는다면 에러를 발생시킨다.
 *
 * @param key
 * @param defaultValue
 * @returns {string}
 */
const required = (key, defaultValue = undefined) => {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`${key} 환경 정보가 누락되었습니다.`);
    }
    
    return value;
};

/**
 * . jwt
 * . bcrypt
 * . morgan
 * . express
 * . db
 * .
 */
const config = {
    jwt: {
        secretKey: required('AUTH_KEY'),
        expiresInSecs: parseInt(required('JWT_EXPIRES_IN_SECS', 86400)),
    },
    
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUND'), 10),
    },
    
    morgan: {
        logLevel: required('MORGAN_LOG_LEVEL', 'dev'),
    },
    
    express: {
        port: parseInt(required('LISTEN_PORT', 8090)),
    },
    
    mysql: {
        host: required('DB_HOST', '127.0.0.1'),
        port: parseInt(required('DB_PORT', 3306)),
        user: required('DB_USER', 'june1'),
        pass: required('DB_PASS', 'qweQWE123!@#'),
        database: required('DB_SCHEMA', 'dweeter'),
    },
    
    mongo: {
        host: required('MONGO_HOST', 'cluster0.xhvewxx.mongodb.net'),
        user: required('MONGO_USER', 'june1'),
        pass: required('MONGO_PASS'),
        database: required('MONGO_DATABASE', 'dweeter'),
    },
};

export default config;
