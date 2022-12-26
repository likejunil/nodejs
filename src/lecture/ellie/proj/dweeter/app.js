/* import */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

import {config} from "./configure/config.js";
import CONSTANT from "./configure/CONSTANT.js";

import tweetsRouter from "./router/tweetsRout.js";
import authRouter from "./router/authRout.js";
import {isAuth} from "./middleware/authToken/jwtAuth.js";

/* variable */
const url = CONSTANT.URL;

/* middle ware */
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(config.morgan.logLevel));
app.use(isAuth);

/* req url: auth */
app.use(url.AUTH, authRouter);
/* req url: tweets */
app.use(url.TWEETS, tweetsRouter);

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
