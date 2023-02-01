const process = require('process');
const path = require('path');
const express = require('express');

const log = console.log;
const error = console.error;

const app = express();
app.set('port', process.env.PORT || 8090);

const f1 = (req, res, next) => {
    console.log("f1 진입");
    next();
};

const f2 = (req, res, next) => {
    console.log("f2 진입");
    next();
};

app.get('/welcome', [f1, f2], (req, res, next) => {
    log('여기에 도착했다면 통과시켜 준다.');
    next();
}, (req, res, next) => {
    log('통과한 너에게 파일을 보내준다.');
    res.sendFile(path.join(__dirname, 'welcome.html'));
});

app.listen(app.get('port'), () => {
    log('서버가 정상 시작되었음');
});
