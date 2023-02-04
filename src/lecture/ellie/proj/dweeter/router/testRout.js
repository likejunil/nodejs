import express from 'express';

/**
 * 1. 하나의 router(==> router.use, router.METHOD)에 여러개의 middleware(==> (req, res, next) => {...})를 적용할 수 있다.
 * 2. next('route') 를 통해 현재 router 를 패스할 수 있다. (router.METHOD 만..)
 * 3. next(Error) 를 통해 하나의 router 에 에러를 모으고 일괄 처리할 수 있다.
 * 4. router.use(), router.METHOD() 의 차이를 이해한다. (req.url 주의..)
 * 5. next() 를 호출한 후에도 middleware 는 계속 진행된다. (next() 이후 코드가 남아 있다면..)
 * 6. res 를 통해서 응답하는 함수의 종류를 이해한다.
 * 7. res 를 통한 응답은 한 번만 할 수 있다.
 */

const router = express.Router();

router.use('/', (req, res, next) => {
    console.log(`router.use("/test") 내부의 미들웨어에서 url=${req.url}`);
    next();
});

router.all('/', (req, res, next) => {
    console.log(`router.all("/test") 내부의 미들웨어에서 url=${req.url}`);
    next();
});

/* 다음과 같이 middleware 를 여러개 적용할 수 있다. */
/* router.use(middleware1, middleware2, [middleware3, middleware4], middleware5, ...) */
const f3 = (req, res, next) => {
    console.log(`미들웨어(1), 함수(3), url=${req.url}`);
    next();
}

const f4 = (req, res, next) => {
    console.log(`미들웨어(1), 함수(4), url=${req.url}`);
    next();
}

router.get('/:path', (req, res, next) => {
    /* middleware 내부에서 적용되는 req.url 에 주의할 것 */
    console.log(`미들웨어(1), 함수(1), url=${req.url}`);
    
    /*
     만약 next('route') 를 호출하면..
     지금의 router.METHOD() 를 벗어나 다음 middleware 를 찾는다.
     단, next('route') 는 router.METHOD() 와 같이 method 가 적용된 middleware 에만 적용된다.
     따라서 router.use() 에서는 next('route') 가 적용되지 않는다.
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
         에러를 모아서 한 곳에서 모두 처리한다.
         */
        console.log('결국 에러를 냈군');
        next(err);
    }
    next();
    
}, [f3, f4]);

router.get('/:path', (req, res, next) => {
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

export default router;
