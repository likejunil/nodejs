import dotenv from 'dotenv';

dotenv.config();

const required = (key, defaultValue = undefined) => {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`${key} 환경 정보가 누락되었습니다.`);
    }
    return value;
};

export const config = {
    jwt: {
        secretKey: required('AUTH_KEY'),
        expiresInSecs: parseInt(required('JWT_EXPIRES_IN_SECS', 86400)),
    },
    
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUND'), 10),
    },
    
    morgan: {
        logLevel: required('MORGAN_LOG_LEVEL', 'tiny'),
    },
    
    network: {
        port: parseInt(required('PORT', 8090)),
    },
    
    db: {
        host: required('DB_HOST', '127.0.0.1'),
        port: parseInt(required('DB_PORT', 3306)),
        user: required('DB_USER', 'june1'),
        pass: required('DB_PASS', 'qweQWE123!@#'),
        database: required('DB_DATABASE', 'dweeter'),
    }
};
