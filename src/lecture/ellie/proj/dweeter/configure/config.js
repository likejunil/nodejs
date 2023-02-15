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
    const value = process.env[key] ?? defaultValue;
    if (value === undefined) {
        throw new Error(`${key} 환경 정보가 누락되었습니다.`);
    }
    
    return value;
};

/**
 * . jwt
 * . bcrypt
 * . morgan
 * . cookie
 * . session
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
        logLevel: required('MORGAN_LOG_LEVEL', 'combined'),
    },
    
    express: {
        port: parseInt(required('LISTEN_PORT', 8090)),
    },
    
    cookie: {
        sign: required('COOKIE_SIGN'),
    },
    
    session: {
        option: {
            /* 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지.. */
            resave: false,
            /* 세션에 저장할 내용이 없더라도 처음부터 세션을 설정할지.. */
            saveUninitialized: false,
            secret: required('SESSION_SECRET'),
            name: 'session.id',
            cookie: {httpOnly: true,},
        },
    },
    
    multer: {
        fileSize: 1024 * 1024 * 5,
        uploadPath: 'uploads/',
    },
    
    mysql: {
        host: required('DB_HOST', '127.0.0.1'),
        port: parseInt(required('DB_PORT', 3306)),
        user: required('DB_USER'),
        pass: required('DB_PASS'),
        database: required('DB_SCHEMA'),
    },
    
    sequelize: {
        host: required('DB_HOST', '127.0.0.1'),
        port: parseInt(required('DB_PORT', 3306)),
        username: required('DB_USER'),
        password: required('DB_PASS'),
        database: required('DB_SCHEMA'),
        dialect: "mysql",
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            // collate: 'utf8mb4_general_ci',
            timestamps: true,
        },
        // logging: false,
    },
    
    mongo: {
        // host: required('MONGO_HOST', 'cluster0.xhvewxx.mongodb.net'),
        host: required('MONGO_HOST', '127.0.0.1'),
        port: parseInt(required('MONGO_PORT', 27017)),
        user: required('MONGO_USER'),
        pass: required('MONGO_PASS'),
        database: required('MONGO_DATABASE'),
    },
};

export default config;
