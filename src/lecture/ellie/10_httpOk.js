const http = require('http');
const fs = require('fs');
const path = require('path');

/*
console.log(http.METHODS);
console.log(http.STATUS_CODES);
*/

const server = http.createServer((req, res) => {
    // 정보 출력
    console.log('...... incoming ......');
    console.log(req.httpVersion);
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    console.log(req.body);
    
    // 확인
    const htmlDir = 'data/html'
    const NOT_FOUND = 'not-found.html';
    const WELCOME = 'welcome.html';
    const welcomeHtml = path.join(__dirname, htmlDir, WELCOME);
    const notFoundHtml = path.join(__dirname, htmlDir, NOT_FOUND);
    
    // 요청 정보에 따른 분기
    const url = req.url;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/welcome') {
        fs.createReadStream(welcomeHtml).pipe(res);
    } else {
        fs.createReadStream(notFoundHtml).pipe(res);
    }
});

server.listen(8088);
