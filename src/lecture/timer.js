const process = require('process');

/**
 * task queue 의 맨 앞에 callback 을 입력하는 방법
 * 지금 당장 task queue 에 callback 을 입력하는 방법
 * 특정 시간 이후에 task queue 에 callback 을 입력하는 방법
 * 일정 주기로 task queue 에 callback 을 입력하는 방법
 */
let count = 0;
console.log("1 입니다.");
const interval = setInterval(() => console.log(`setInterval 에서 호출되었습니다.`), 1);
setTimeout(() => clearInterval(interval), 4);

console.log("2 입니다.");
setTimeout(() => console.log('setTimeout 에서 호출되었습니다.'), 0);

console.log("3 입니다.");
setImmediate(() => console.log('setImmediate 에서 호출되었습니다.'));

console.log("4 입니다.");
process.nextTick(() => console.log('nextTick 에서 호출되었습니다.'));

console.log("5 입니다.");
