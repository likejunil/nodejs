const dotenv = require('dotenv');
const process = require("process");
dotenv.config();

const required = (key, defaultValue) => {
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
    rootPath: process.env.PWD,
    
    express: {
        port: parseInt(required('EXPRESS_PORT', 8001)),
    },
    
    morgan: {
        level: 'dev',
    },
    
    cookie: {
        sign: required('COOKIE_SIGN'),
    },
    
    session: {
        option: {
            /* 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장하는가? */
            resave: false,
            /* 세션에 저장할 내용이 없더라도 처음부터 세션을 저장하는가? */
            saveUninitialized: false,
            /* 반드시 쿠키 암호화 키와 같아야 한다. */
            // secret: required('SESSION_SECRET'),
            secret: required('COOKIE_SIGN'),
            name: 'connect.sid',
            cookie: {
                httpOnly: true,
                /* https 로 변경할 때 secure 를 true 로 설정 */
                secure: false,
            },
        },
    },
    
    sequelize: {
        host: required('DB_HOST', '127.0.0.1'),
        port: parseInt(required('DB_PORT', 3306)),
        username: required('DB_USER', 'june1'),
        password: required('DB_PASS'),
        database: required('DB_DATABASE', 'nodebird'),
        dialect: "mysql",
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: true,
        },
        // logging: console.log,
    },
    
    bcrypt: {
        salt: 9,
    },
    
    passport: {
        kakao: {
            clientID: 'a824b6155ee9a02f2f0d83d2b22950f9',
            callback: '/auth/kakao/callback',
        },
    },
};

module.exports = config;
