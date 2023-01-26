const http = require('http');
const fs = require('fs');
const path = require('path');
const log = console.log;

/*
log(http.METHODS);
log(http.STATUS_CODES);
*/

const server = http.createServer((req, res) => {
    // 정보 출력
    log(req.httpVersion);
    log(req.method);
    log(req.url);
    log(req.headers);
    log(req.body);
    
    // 확인
    const htmlDir = 'data/html'
    const NOT_FOUND = 'not-found.html';
    const WELCOME = 'welcome.html';
    const welcomeHtml = path.join(__dirname, htmlDir, WELCOME);
    const notFoundHtml = path.join(__dirname, htmlDir, NOT_FOUND);
    
    // 요청 정보에 따른 분기
    res.setHeader('Content-Type', 'text/html');
    if (req.url === '/welcome') {
        fs.createReadStream(welcomeHtml).pipe(res);
    } else {
        fs.createReadStream(notFoundHtml).pipe(res);
    }
});

server.listen(8088);
