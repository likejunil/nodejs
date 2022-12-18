const fs = require('fs');

/**
 * 파일에 대한 작업을 할 때 fs 모듈을 사용한다.
 * 3가지 방식이 존재한다. (예를 들어 rename 의 경우)
 * 1. rename(..., callback(error))
 * 2. try { renameSync() } catch(e) { ... }
 * 3. promises.rename().then().catch()
 */

const OLD_NAME = './apple';
const NEW_NAME = './grape';

// 1. 동기 방식의 함수를 사용
try {
    fs.renameSync(OLD_NAME, NEW_NAME);
} catch (e) {
    console.error(e.errno, e.message);
} finally {
    console.log('그래도 작업은 진행된다.')
}
console.log('안녕1');

// 2. callback 함수를 전달
fs.rename(OLD_NAME, NEW_NAME, e => console.error(e.errno, e.message));
console.log('안녕2');

// 3. promise 를 사용
fs.promises
    .rename(OLD_NAME, NEW_NAME)
    .then(() => console.log('파일 이름 변경 성공'))
    .catch(e => console.error(e.errno, e.message))
    .finally(() => console.log('그래도 역시 작업은 진행된다.'));
console.log('안녕3');
