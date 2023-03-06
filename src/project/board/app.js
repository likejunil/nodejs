const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const config = require('./config/config.js');
const useCookie = require('./middleware/cookie/cookie.js');
const useSession = require('./middleware/session/session.js');
const initPassport = require('./middleware/passport');
const {sequelize} = require('./repository/sequelize/associate.js');
const {validator} = require('./middleware/validator');

const test = require('./middleware/test/test.js');
const auth = require('./router/auth.js');
const user = require('./router/user.js');
const band = require('./router/band.js');
const log = console.log;

const app = express();

/* 정적 파일 요청 디렉토리와 물리적 디렉토리 연결 */
/* 선언 위치에 따라 로그, 보안과 같은 미들웨어 적용 유무 선택 가능 */
/* 파일을 다운로드 할 경우 async 방식으로 작동 */
app.use('/', express.static(path.join(__dirname, 'public')));

// todo
//  - 로그를 파일에 저장하여 관리하는 방법 확인
/* https://expressjs.com/en/resources/middleware/morgan.html */
/* morgan(':method :url :status :res[content-length] - :response-time ms') */
/* combined | common | dev | short | tiny */
app.use(morgan(config.morgan.level));

/* 보안 */
app.use(helmet());

/* content-type: application/x-www-formed-urlencoded */
/* 다음을 적용하지 않으면 application/x-www-formed-urlencoded 를 통해 전달하는 데이터를 받을 수 없음 */
/* req.body 에 적재되지 않음, 따라서 undefined 로 초기화 */
app.use(express.urlencoded({extended: true}))
/* 다음을 적용하지 않으면 body 의 json 내용을 읽을 수 없다. */
app.use(express.json());
/* 다음을 적용하지 않으면 body 의 text 내용을 읽을 수 없다. */
app.use(express.text());

/* client 가 보내온 useCookie 를 읽어서 객체로 만들어 준다. */
/* req.cookies | req. signedCookies 로 접근이 가능하다. */
app.use(cookieParser(config.cookie.signed));
/* client 가 보내온 useCookie 확인 및 조작 */
app.use(useCookie);

/* session 사용 */
/* session 은 cookieParser 와 상관 없이 독립적으로 실행된다. */
/* session 에 접근할 cookie key(connect.sid) 가 존재하는 경우 async 방식으로 작동한다. */
/* call-stack 에 쌓였던 모든 함수가 종료되고..
/* req.session 을 생성한 후 next() 에 의해 다음 router 를 실행한다. */
app.use(session(config.session.option));
app.use(useSession);

/* session 을 사용하여 인증을 한다면 session 처리 이후 적용 */
/* 인증과 관련한 method 및 data 를 생성 */
app.use(passport.initialize());
/* req.session.passport 가 존재한다면 passport.deserialize() 를 호출 */
app.use(passport.session())

/* test 를 위한 라우터 */
app.use('/test', test);

/* 진행 과정 확인 */
/*
app.use((req, res, next) => {
    log();
    next();
    log();
})
 */

/* router */
app.use(validator);
app.use('/auth', auth);
app.use('/user', user);
app.use('/band', band);

/* not found */
app.use((req, res, next) => {
    const error = new Error(`not found: ${req.method} ${req.url}`);
    error.status = 404;
    /* 에러 처리 핸들러로 위임한다. */
    next(error)
});

/* handle error */
/* 에러를 모아서 하나의 라우터에서 처리한다. */
/* 에러 핸들러는 반드시 인자가 4개여야 한다. */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        result: "failed",
        message: err.message,
    });
});

sequelize.sync({force: false})
    .then(() => {
        log('- connect to database');
        initPassport();
        log('- init passport');
        app.listen(config.express.port, () => log(`- listening port: ${config.express.port}`));
    })
    .catch(err => {
        console.error(err);
        log(`\n`
            + `  #############################\n`
            + `     프로세스 종료\n`
            + `  #############################\n`
        );
        process.exit(-1);
    });

log(`\n`
    + `  #############################\n`
    + `     프로세스 시작\n`
    + `  #############################\n`
);
