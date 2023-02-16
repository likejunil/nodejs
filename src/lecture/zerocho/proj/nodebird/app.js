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
const nunjucks = require('nunjucks');
const {sequelize} = require('./repository/sequelize/initialize.js');

// const router = require('./routes/router.js');
const auth = require('./routes/authRout.js');
const page = require('./routes/pageRout.js');
const app = express();

/* ----------------------- */
/* 설정 */
/* ----------------------- */
/* nunjucks 설정 */
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
app.use(helmet());

/* 인증 이전에 정적 데이터를 먼저 처리 */
/* 정적 데이터에도 인증이 필요하다면 순서 조정 필요 */
/* 기본적인 html, css, js, img 등 서버가 정적으로 준비하고 제공할 컨텐츠 */
/* 이러한 요청은 굳이 로그를 남길 필요가 없으므로.. */
app.use("/", express.static(path.join(__dirname, 'public')));

/* 요청에 대한 로그 기록 */
app.use(morgan(config.morgan.level));
/* 사용자가 "/img/..." 으로 이미지를 올릴 경우 */
/* 사용자가 파일을 업로드하는 것은 로그를 남길 필요가 있으므로.. */
app.use("/img", express.static(path.join(__dirname, "upload")));

/* 쿠키 사용 */
app.use(cookieParser(config.cookie.sign));
/* 세션 사용 */
app.use(session(config.session.option));

/* application/x-www-form-encoded 형태의 요청 파라미터를 처리하기 위해.. */
/* html body 에 key=value&key=value.. 형태로 전달된다. (post method 사용) */
/* extended: false 이면 express 내부의 query string 모듈을 사용 */
/* extended: true 이면 외부 모듈 qs 를 사용 (추천) */
/* req.body 에서 읽어서 처리한다. */
app.use(express.urlencoded({extended: true}));
/* body 의 json 데이터 처리 */
app.use(express.json());

/* ----------------------- */
/* 서비스 분기(라우트) */
/* ----------------------- */
/* 실제 요청 처리를 위한 모든 미들웨어의 처리가 끝났으므로 서비스 분기 시작 */
app.use("/auth", auth);
app.use("/", page);

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
/* req.app.locals: middleware 에서 req 를 통해 app.locals 를 사용 */
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
sequelize.sync({force: true})
    .then(() => {
        console.log("\n"
            + "  **********************\n"
            + "     프로세스 시작\n"
            + "  **********************\n"
        );
        console.log('데이터베이스 접속 성공');
        app.listen(config.express.port, () => {
            console.log(`서비스 대기 포트: ${config.express.port}`);
        });
    })
    .catch(err => {
        console.error(err.message);
        console.log("\n"
            + "  **********************\n"
            + "     프로세스 종료\n"
            + "  **********************\n"
        );
        process.exit(-1);
    });
