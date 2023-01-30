const process = require('process');

// try catch 를 하지 않은 모든 에러를 보고한다.
process.on('uncaughtException', e => {
    console.log('에러를 놓치지 않겠어요.');
    console.error('에러가 발생했습니다.');
});

const f1 = () => {
    throw new Error('나는 에러다');
    console.log('여기는 실행되지 않습니다.');
};

f1();
console.log('여기도 실행되지 않습니다.');
