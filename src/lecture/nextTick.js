const process = require('process');

/**
 * 대기중인 callback 함수들을 무시하고 가장 먼저 처리해야 할 일을 추가하는 방법
 * process.nextTick(callback)
 */
console.log('안녕하세요.');
setTimeout(() => console.log('나는 준일입니다.'));
console.log('제 나이는 48살 입니다.');
process.nextTick(() => console.log('task queue 의 맨 앞으로 가겠습니다.'));
console.log('저의 소개를 마칩니다.');
