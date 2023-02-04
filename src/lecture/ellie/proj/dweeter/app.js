/* module */
import path from 'path';
import process from 'process';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import 'express-async-errors';

/* config */
import config from "./configure/config.js";
import CONSTANT from "./configure/CONSTANT.js";

/* middleware */
import {authProc} from "./middleware/auth/jwtAuth.js";
import useCookie from "./middleware/cookie/cookie.js";
import useSession from "./middleware/session/session.js";

/* router */
import tweetsRouter from "./router/tweetsRout.js";
import usersRouter from "./router/usersRout.js";
import uploadRouter from "./router/uploadRout.js";
import testRouter from "./router/testRout.js";

/* repository */
import {sequelize} from "./repository/sequelize/initSequelize.js";

/* --------------------------- */
/* middle ware */
/* --------------------------- */
/* 미들웨어의 순서를 주의하라 */
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan(config.morgan.logLevel));
app.use('/files', express.static(path.join(process.cwd(), '/static/files')));
app.use(express.static(path.join(process.cwd(), '/static/html')));

/* application/x-www-form-urlencoded 의 경우를 위해 설정, req.body 에서 읽어서 처리 */
app.use(express.urlencoded({extended: true}));
/* application/json 의 경우를 위해 설정, req.body 에서 읽어서 처리 */
app.use(express.json());

app.use(authProc);
app.use(cookieParser(config.cookie.sign));
/* 세션 저장소를 위해 별도의 공간을 마련할 것: redis */
app.use(session(config.session.option));

app.use(useCookie);
app.use(useSession);

/* --------------------------- */
/* router */
/* --------------------------- */
const {URL: url} = CONSTANT;
/* req url: auth */
app.use(url.AUTH, usersRouter);
/* req url: tweets */
app.use(url.TWEETS, tweetsRouter);

/* test */
app.use("/test", testRouter);
/* file upload */
app.use("/upload", uploadRouter);

/* --------------------------- */
/* not found */
/* --------------------------- */
app.use((req, res) => {
    console.error(`해당 url 에 대한 서비스를 제공하지 않음, url = |${req.url}|`);
    res.sendStatus(404);
});

/* --------------------------- */
/* handle error */
/* --------------------------- */
/* 에러 핸들링은 next() 에 의해서 호출되는 것이 아니다. */
/* 반드시 4개의 인자를 주어야만 한다 */
app.use((error, req, res, next) => {
    console.error(`서버 에러 발생 = |${error}|`);
    res.status(500).send('<h1>남자라면 끝까지 도전!</h1>');
});

/* --------------------------- */
/* sequelize */
/* mongodb */
/* express start */
/* web-socket */
/* --------------------------- */
Promise.all([
        sequelize.sync({force: false}),
        // connectMongo(),
    ])
    .then(res => {
        const sequelizeRes = res[0];
        const {database, username, host, port} = sequelizeRes.config;
        console.log('connected Sequelize: '
            + `host=|${host}|, `
            + `port=|${port}|, `
            + `database=|${database}|, `
            + `username=|${username}|`)
        
        /* app start */
        const server = app.listen(config.express.port, () => {
            console.log(`***** listening port: ${config.express.port} *****`);
        });
        
        /* socket.io 사용 */
        // initSocket(server);
    })
    .catch(err => {
        console.error(err);
        process.exit(-1);
    });
