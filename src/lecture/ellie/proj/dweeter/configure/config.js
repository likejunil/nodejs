import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

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
        sign: required('COOKIE_SIGN', "earth-cat-blue-orange"),
    },
    
    session: {
        option: {
            /* 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지.. */
            resave: false,
            /* 세션에 저장할 내용이 없더라도 처음부터 세션을 설정할지.. */
            saveUninitialized: false,
            secret: required('SESSION_SECRET', "mars-tiger-black-banana"),
            name: 'session.id',
            cookie: {
                httpOnly: true,
            },
        },
    },
    
    multer: {
        /* 디스크 또는 메모리.. */
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, 'upload/')
            },
            
            /**
             * file = {
             *     "fieldname": "file", // html form 에 정의된 필드 이름
             *     "originalname": "jortu.png", // 사용자가 업로드 한 파일 이름
             *     "encoding": "7bit",
             *     "mimetype": "image/png",
             *     "destination": "upload/",
             *     "filename": "jortu1641367168859.png",
             *     "path": "upload/jortu1641367168859.png",
             *     "size": 381172 // byte 단위
             * }
             */
            filename(req, file, done) {
                /* 확장자는 "." 을 포함한다. */
                const ext = path.extname(file.originalname);
                /* 확장자를 제외한 파일 이름 + 밀리초(from 1970.01.01) + 확장자 */
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            }
        }),
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
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
        port: parseInt(required('MONGO_PORT', 27017)),
        user: required('MONGO_USER', 'june1'),
        pass: required('MONGO_PASS'),
        database: required('MONGO_DATABASE', 'dweeter'),
    },
};

export default config;
