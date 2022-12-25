/* import */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

import {logFormat, port} from "./configure/env.js";
import CONSTANT from "./configure/CONSTANT.js";

import tweetsRouter from "./router/tweetsRout.js";
import usersRouter from "./router/usersRout.js";
import authRouter from "./router/authRout.js";
import {isAuth} from "./middleware/authToken/jwtAuth.js";

/* variable */
const url = CONSTANT.URL;

/* middle ware */
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(logFormat));
app.use(isAuth);

/* req url: tweets */
app.use(url.TWEETS, tweetsRouter);
/* req url: users */
app.use(url.USERS, usersRouter);
/* req url: auth */
app.use(url.AUTH, authRouter);

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
app.listen(port);
