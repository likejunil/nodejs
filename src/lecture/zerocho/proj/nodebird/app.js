/* ----------------------- */
/* require */
/* ----------------------- */
const path = require('path');
const config = require('./config/config.js');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sequelize = require('./repository/sequelize/associate.js');
const passport = require('passport');
const nunjucks = require('nunjucks');

const auth = require('./router/authRout.js');
const page = require('./router/pageRout.js');
const post = require('./router/postRout.js');
const user = require('./router/userRout.js');
const initPassport = require('./middleware/passport');
const useCookies = require('./middleware/cookie');
const useSession = require('./middleware/session');
const app = express();
const log = () => {
};

/* ----------------------- */
/* 설정 */
/* ----------------------- */
/* nunjucks 설정 */
/* views 디렉토리에 html 확장자를 가진 템플릿을 사용 */
app.set('view engine', 'html');
nunjucks.configure('views', {
    /* 보안을 위해 설정 */
    autoescape: true,
    /* 서버 지정 */
    express: app,
    /* html 파일이 변경될 때마다 템플릿 엔진을 reload 한다. */
    watch: true,
});

/* ----------------------- */
/* 적용 */
/* ----------------------- */
/* 제일 먼저 보안처리부터.. */
/* Refused to load the script 'https://unpkg.com/axios/dist/axios.min.js' 때문에 잠시 해제 */
// app.use(helmet());

/* 인증 이전에 정적 데이터를 먼저 처리 */
/* 정적 데이터에도 인증이 필요하다면 순서 조정 필요 */
/* 기본적인 html, css, js, img 등 서버가 정적으로 준비하고 제공할 컨텐츠 */
/* 이러한 요청은 굳이 로그를 남길 필요가 없으므로.. */
app.use("/", (req, res, next) => {
    /* "/" 에 대한 요청이 들어오면 async 로 처리가 된다. */
    /* 따라서 이미 call-stack 에 올라온 모든 함수가 종료 처리된다. */
    /* 그리고 next() 가 호출되면서 다음 router 가 실행된다. */
    // todo 2023.0220
    //  - 언제 async 로 실행되는가?
    log();
    express.static(path.join(__dirname, 'public'))(req, res, next);
    log();
});

/* 요청에 대한 로그 기록 */
app.use(morgan(config.morgan.level));

/* 사용자가 "/img/..." 파일을 요청할 때는 로그를 남길 필요가 있다. */
app.use("/img", (req, res, next) => {
    /* "/img" 에 대한 요청이 들어오면 async 로 처리가 된다. */
    /* 따라서 이미 call-stack 에 올라온 모든 함수가 종료 처리된다. */
    /* 그리고 next() 가 호출되면서 다음 router 가 실행된다. */
    log();
    express.static(path.join(config.rootPath, "upload"))(req, res, next);
    log();
});

/* 쿠키 사용 */
app.use((req, res, next) => {
    log();
    cookieParser(config.cookie.sign)(req, res, next);
    log();
});
/* 쿠키 내용 확인 */
app.use(useCookies);

/* 세션 사용 */
app.use((req, res, next) => {
        log();
        next();
        log();
    },
    /* session 에 접근할 cookie key(connect.sid) 가 존재하는 경우 async 방식으로 작동한다. */
    /* call-stack 에 쌓였던 모든 함수가 종료되고..
    /* req.session 을 생성한 후 next() 에 의해 다음 router 를 실행한다. */
    // todo 2023.0220
    //  - session() 함수는 왜 (req, res, next) => session()(req, res, next) 형식으로는 사용할 수 없을까?
    session(config.session.option),
    (req, res, next) => {
        log();
        next();
        log();
    });
/* 세션 내용 확인 (1) */
app.use(useSession);

/* passport 사용 */
/* passport 초기화를 통해 req.isAuthenticated, req.login, req.logout 생성 */
app.use((req, res, next) => {
    log();
    passport.initialize()(req, res, next);
    log();
});
/* passport 정보를 session 에서 찾음 */
/* connect.sid 의 값으로 session 에서 정보 검색 */
/* req.session.passport 가 존재한다면.. */
/* passport.deserializeUser(f) 의 인자인 f 를 실행한다. */
app.use((req, res, next) => {
    log();
    passport.session()(req, res, next);
    log();
});
/* 세션 내용 확인 (2) */
app.use(useSession);

/* application/x-www-form-encoded 형태의 요청 파라미터를 처리하기 위해.. */
/* html body 에 key=value&key=value.. 형태로 전달된다. (post method 사용) */
/* extended: false 이면 express 내부의 query string 모듈을 사용 */
/* extended: true 이면 외부 모듈 qs 를 사용 (추천) */
/* req.body 에서 읽어서 처리한다. */
app.use((req, res, next) => {
    /* application/x-www-form-encoded 일 경우 async 로 진행된다. */
    /* 따라서 call-stack 에 쌓인 모든 함수가 종료된다. */
    /* 그리고 다음 next() 에 의해 다음 router 가 실행된다. */
    log();
    express.urlencoded({extended: true})(req, res, next);
    log();
});

/* body 의 json 데이터 처리 */
app.use((req, res, next) => {
    log();
    express.json()(req, res, next);
    log();
});

/* ----------------------- */
/* 서비스 분기(라우트) */
/* ----------------------- */
/* 실제 요청 처리를 위한 모든 미들웨어의 처리가 끝났으므로 서비스 분기 시작 */
app.use("/auth", auth);
app.use("/", page);
app.use("/post", post);
app.use("/user", user);

/* ----------------------- */
/* 에러 */
/* ----------------------- */
/* not found */
app.use((req, res, next) => {
    const error = new Error(`not found = |${req.method}:${req.url}|`);
    error.status = 404;
    next(error);
});

/* handle error */
/* 반드시 err 매개변수를 포함하여 4개의 인자를 전달해야 한다. */
/* app.locals: 프로세스 전반에 걸친 저장소 */
/* req.app.locals: middleware 에서 req 를 통해 app 의 지역변수를 사용 */
/* res.locals: 해당 요청에 대해서만 유효한 데이터 저장 */
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env['MODE'] !== 'product' ? err : {};
    res.status(err.status ?? 500);
    res.render('error');
});

/* ----------------------- */
/* 실행 */
/* ----------------------- */
/* process start */
sequelize.sync({force: false, alter: false})
    .then(() => {
        log("\n"
            + "  **********************\n"
            + "     프로세스 시작\n"
            + "  **********************\n"
        );
        log('데이터베이스 접속 성공');
        
        /* passport 초기화 */
        initPassport();
        
        app.listen(config.express.port, () => {
            log(`서비스 대기 포트: ${config.express.port}`);
        });
    })
    .catch(err => {
        console.error(err.message);
        log("\n"
            + "  **********************\n"
            + "     프로세스 종료\n"
            + "  **********************\n"
        );
        process.exit(-1);
    });
