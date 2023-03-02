const dotenv = require('dotenv');
dotenv.config();

const required = (key, defaultValue) => {
    const value = process.env[key];
    if (value) return value;
    if (defaultValue) return defaultValue;
    throw new Error(`|${key}|에 해당하는 환경변수가 존재하지 않음`);
}

const config = {
    express: {
        port: parseInt(required('PORT')),
    },
    
    morgan: {
        level: required('LOG_LEVEL', 'combined')
    },
    
    cookie: {
        signed: required('CRYPT_KEY'),
    },
    
    session: {
        option: {
            /* 변경 사항이 없어도 session 을 다시 저장할 것인가? */
            resave: false,
            /* 저장할 내용이 없더라도 최초 세션을 설정할 것인가? */
            saveUninitialized: false,
            /* secret option required for sessions */
            secret: required('CRYPT_KEY'),
            name: 'connect.sid',
            cookie: {
                httpOnly: true,
                path: '/',
            },
        },
    },
    
    sequelize: {
        option: {
            host: required('DB_HOST'),
            port: parseInt(required('DB_PORT')),
            username: required('DB_USER'),
            password: required('DB_PASS'),
            database: required('DB_DATABASE'),
            dialect: 'mysql',
            define: {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci',
                timestamp: true,
            },
            // todo
            //  - 로그를 파일에 저장하여 관리하는 방법 확인
            logging: console.log,
        },
    },
    
    bcrypt: {
        salt: parseInt(required('SALT_ROUND', 9)),
    },
};

module.exports = config;
