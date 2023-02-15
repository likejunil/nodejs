/* ----------------------- */
/* require */
/* ----------------------- */
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

const config = require('./config/config.js');
const router = require('./routes/router.js');
const app = express();

/* ----------------------- */
/* 설정 */
/* ----------------------- */
/* nunjucks 설정 */
app.set('view engine', 'html');
nunjucks.configure('views', {
    autoescape: true,
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
app.use(express.static(path.join(__dirname, 'public')));
/* 요청에 대한 로그 기록 */
app.use(morgan(config.morgan.level));
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

/* router */
/* 실제로 모든 요청에 대한 분기는 router 에서 한다. */
app.use("/", router);

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
app.listen(config.express.port, () => {
    console.log(`listening port: ${config.express.port}`);
});
