const log = console.log;

const cookies = (req, res, next) => {
    const cookies = req.signedCookies;
    
    log(`${Object.keys(cookies).length}개의 쿠키를 수신했습니다.`);
    for (const m in cookies) {
        log(`${m}: ${cookies[m]}`);
    }
    
    next();
};

module.exports = cookies
