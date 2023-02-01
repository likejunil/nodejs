/* module */
import path from 'path';
import process from 'process';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import multer from 'multer';
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

const upload = multer(config.multer);

/* --------------------------- */
/* router */
/* --------------------------- */
const {URL: url} = CONSTANT;
/* req url: auth */
app.use(url.AUTH, usersRouter);
/* req url: tweets */
app.use(url.TWEETS, tweetsRouter);

/* --------------------------- */
/* test */
/* --------------------------- */
/* middleware 내부에서 적용되는 req.url 에 주의할 것
/* app.use(), app.METHOD() 가 다르다. app.all() 은 all.METHOD() 와 같다. */
/* '/test/*' 와 같은 표현은 적용되지 않는다. */
app.use('/test', (req, res, next) => {
    console.log(`app.use("/test") 내부의 미들웨어에서 url=${req.url}`);
    next();
});

app.all('/test', (req, res, next) => {
    console.log(`app.all("/test") 내부의 미들웨어에서 url=${req.url}`);
    next();
});

/* 다음과 같이 middleware 를 여러개 적용할 수 있다. */
/* app.use(middleware1, middleware2, [middleware3, middleware4], middleware5, ...) */
const f3 = (req, res, next) => {
    console.log(`미들웨어(1), 함수(3), url=${req.url}`);
    next();
}

const f4 = (req, res, next) => {
    console.log(`미들웨어(1), 함수(4), url=${req.url}`);
    next();
}

app.get('/test/:path', (req, res, next) => {
    /* middleware 내부에서 적용되는 req.url 에 주의할 것 */
    console.log(`미들웨어(1), 함수(1), url=${req.url}`);
    
    /*
     만약 next('route') 를 호출하면..
     지금의 app.METHOD() 를 벗어나 다음 middleware 를 찾는다.
     단, next('route') 는 app.METHOD() 와 같이 method 가 적용된 middleware 에만 적용된다.
     따라서 app.use() 에서는 next('route') 가 적용되지 않는다.
     */
    const {path} = req.params;
    if (path === 'pass') {
        console.log('다음 미들웨어로 간다.')
        next('route');
    } else {
        next();
    }
    
}, (req, res, next) => {
    /* middleware 내부에서 적용되는 req.url 에 주의할 것 */
    console.log(`미들웨어(1), 함수(2), url=${req.url}`);
    
    try {
        const {path} = req.params;
        if (path === 'error') {
            console.log('에러를 접수한다.');
            throw new Error('뻔한 에러');
        }
    } catch (err) {
        /*
         next(error) 와 같이 인자를 넣어 호출하면 곧바로 에러 처리로 넘어간다.
         그래서 보통 try-catch 로 에러를 잡으면 next(error) 를 통해 에러 처리를 넘긴다.
         에러 처리를 모아서 한 곳에서 모두 처리한다.
         */
        console.log('결국 에러를 냈군');
        next(err);
    }
    next();
    
}, [f3, f4]);

app.get('/test/:path', (req, res, next) => {
    /* middleware 내부에서 적용되는 req.url 에 주의할 것 */
    console.log(`미들웨어(2), 함수(1), url=${req.url}`);
    
    const {path} = req.params;
    if (path === 'pass') {
        console.log('pass 를 갖고 있군');
        // return 에 주의할 것..
        return res.json({message: '남자군..'})
        
        /*
        res.send(버퍼 또는 문자열 또는 HTML 또는 JSON);
        res.sendFile(파일 경로);
        res.json(JSON 데이터);
        res.redirect(주소);
        res.render('템플릿 파일 경로',{ 변수 });
         */
    }
    next();
});

/* --------------------------- */
/* not found */
/* --------------------------- */
app.use((req, res, next) => {
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

Promise.all([
        // sequelize.sync(),
        // connectMongo(),
    ])
    .then(res => {
        // console.log(res);
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
