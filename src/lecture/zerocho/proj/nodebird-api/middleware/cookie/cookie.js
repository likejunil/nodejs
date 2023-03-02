const LOG = false;
const log = LOG ? console.log : () => {
};

const cookie = (req, res, next) => {
    /* 암호화를 하지 않으면 signedCookies 는 {} 이다. */
    /* undefined, null 이 아니다. */
    /* javascript 에서 {} 는 true 이다. */
    // const cookies = req.cookies;
    const cookies = req.signedCookies;
    const targetKey = 'count';
    let count = 0;
    const limitCount = 3;
    
    /* 먼저 client 가 보내온 cookie 를 확인한다. */
    /* cookies 는 배열이 아니라 객체이다. */
    log('<< 쿠기 수신 >>');
    for (const m in cookies) {
        log(`${m}: ${cookies[m]}`);
        if (m === targetKey) {
            /* 쿠키의 내용은 항상 문자열로 온다. */
            count = parseInt(cookies[m]);
        }
    }
    
    if (count >= limitCount) {
        log('<< 쿠키 삭제 >>')
        /* 쿠키 삭제에는 반드시 경로 정보를 함께 주어야 한다. */
        res.clearCookie(targetKey, {path: '/test'});
        return next();
    }
    
    log('<< 쿠키 송신 >>');
    /* path 값을 활용하여 요청 url 마다 다른 쿠키를 사용할 수 있음 */
    res.cookie(targetKey, count + 1, {
        httpOnly: true,
        signed: true,
        /* "/test/*" 요청에 대해서만 쿠키를 응답 */
        path: '/test',
        /* 밀리초 단위 */
        maxAge: 1000 * 5 * 60,
    });
    
    next();
};

module.exports = cookie;
