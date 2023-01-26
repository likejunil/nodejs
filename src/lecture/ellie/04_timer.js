const process = require('process');
const log = console.log;

/**
 * 1. task queue 의 맨 앞에 callback 을 입력하는 방법: process.nextTick()
 * 2. 지금 당장 task queue 에 callback 을 입력하는 방법: setImmediate()
 * 3. 특정 시간 이후에 task queue 에 callback 을 입력하는 방법: setTimeout()
 * 4. 일정 주기로 task queue 에 callback 을 입력하는 방법: setInterval()
 */

log("1 입니다.");

let count = 0;
const id = setInterval(() => log(`[A] setInterval 에서 호출되었습니다. ${count++}`), 1);
setTimeout(() => {
    log("인터벌 타이머 중지합니다.");
    clearInterval(id);
}, 4);
log("2 입니다.");

setImmediate(() => log('[B] setImmediate 에서 호출되었습니다.'));
log("3 입니다.");

setTimeout(() => log(`[C] setTimeout 에서 호출되었습니다.`), 0);
log("4 입니다.");

process.nextTick(() => log('nextTick 에서 호출되었습니다.(무조건 제일 먼저)'));
log("5 입니다.");

log("=> nextTick 은 가장 먼저 호출되는 것을 보장한다.\n" +
    "=> 하지만 setImmediate, setInterval, setTimeout 의 호출 순서는 보장하지 않는다.");
