/* import */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

import config from "./configure/config.js";
import CONSTANT from "./configure/CONSTANT.js";

import {authProc} from "./middleware/auth/jwtAuth.js";
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

/* req url: auth */
app.use(CONSTANT.URL.AUTH, authRouter);
/* req url: tweets */
app.use(CONSTANT.URL.TWEETS, tweetsRouter);

/* not found */
app.use((req, res, next) => {
    res.sendStatus(404);
});

/* handle error */
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

/* app start */
app.listen(config.network.port);
