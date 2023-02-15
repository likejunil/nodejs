const dotenv = require('dotenv');
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
            secret: required('SESSION_SECRET'),
            name: 'session.id',
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
        user: required('DB_USER', 'june1'),
        pass: required('DB_PASS'),
        database: required('DB_DATABASE', 'nodebird'),
    },
};

module.exports = config;
