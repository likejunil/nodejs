/* import */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

import config from "./configure/config.js";
import CONSTANT from "./configure/CONSTANT.js";

import {authProc} from "./middleware/auth/jwtAuth.js";
import {initSocket} from "./middleware/socketio/socketio.js";
import sequelize from './repository/sequelize/initSequelize.js';
import tweetsRouter from "./router/tweetsRout.js";
import authRouter from "./router/usersRout.js";

/* middle ware */
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(config.morgan.logLevel));
// 모든 url 에 대하여 빠짐없이 authProc 을 진행한다.
// authProc 예외는 authProc 내부에서 필터링된다.
app.use(authProc);

const {URL: url} = CONSTANT;
/* req url: auth */
app.use(url.AUTH, authRouter);
/* req url: tweets */
app.use(url.TWEETS, tweetsRouter);

/* test1 */
app.use((req, res, next) => {
    console.log('여기를 통과하는지 확인(1)');
    next();
});

/* test2 */
app.use((req, res, next) => {
    console.log('여기를 통과하는지 확인(2)');
    next();
});

/* not found */
app.use((req, res, next) => {
    console.error(`해당 url 에 대한 서비스를 제공하지 않음, url = |${req.url}|`);
    res.sendStatus(404);
});

/* handle error */
/* 에러 핸들링은 next() 에 의해서 호출되는 것이 아니다. */
app.use((error, req, res, next) => {
    console.error(`서버 에러 발생 = |${error}|`);
    res.sendStatus(500);
});

/* sequelize */
sequelize.sync()
    .then(() => {
        /* app start */
        const server = app.listen(config.express.port);
        
        /* socket.io 사용 */
        initSocket(server);
    });
