const http = require('http');

const server = http
    .createServer(async (req, res) => {
        res.end('***** sorry, no service *****');
    })
    .listen(8888, () => {
        console.log('8888 포트에서 요청을 받습니다.');
    });

server.on('error', err => {
    console.error(`에러 발생: ${err.message}, 서버를 종료합니다.`);
    process.exit(-1);
});

