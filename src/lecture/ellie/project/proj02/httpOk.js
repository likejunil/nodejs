const http = require('http');
const fs = require('fs');

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
    
    // 확인
    const welcomeHtml = './html/welcome.html';
    const notFoundHtml = './html/not-found.html';
    
    // 요청 정보에 따른 분기
    const url = req.url;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/it') {
        fs.createReadStream(welcomeHtml).pipe(res);
    } else {
        fs.createReadStream(notFoundHtml).pipe(res);
    }
});

server.listen(8080);
