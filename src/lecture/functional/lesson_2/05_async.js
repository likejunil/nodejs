/**
 * go1 = (a, f) => f(a) 를 비동기에서 사용하려면..
 *
 * Monad
 * - 함수들의 진행이 에러에 자연스럽게 대처하며 진행되도록 하는 방법
 *
 * Array.of().map().map()...
 * Promise.resolve().then().then()...
 *
 * Kleisli
 * - 두 함수의 합성을 실행할 때, 첫 번째 함수에서 에러가 발생하면 합성 함수의 실행도 같은 에러를 반환하도록 처리
 *
 */

const {_, L} = require('./fp.js');
const log = console.log;

const go1 = (a, f) => {
    if (a instanceof Promise) {
        a.then(res => {
            log('Promise 패턴의 go1 실행');
            return f(res);
        }).catch(err => {
            log(err);
        });
    } else {
        log('일반 패턴의 go1 실행');
        return f(a);
    }
}

const add10 = (a) => log(a + 10);

const f1 = () => {
    // 비동기 방식
    const delay300 = (a) => new Promise((resolve, reject) => {
        log('   2. Promise 객체가 new 연산으로 생성될 때, 인자로 주어진 함수가 즉시 실행');
        log('   3. Promise 객체가 pending 상태를 벗어나기 직전');
        setTimeout(() => resolve(a), 300);
        // resolve(a);
        // reject('실패');
        log('   4. Promise 객체가 pending 상태를 벗어난 직후');
    });
    
    log('1. Promise 를 생성하기 직전');
    // 상태를 간직한 promise 를 반환한다.
    const promise = delay300(10);
    log('5. Promise 를 생성한 직후');
    log(promise);
    
    log('6. go1 를 실행 직전');
    go1(promise, add10);
    log('7. go1 를 실행 직후');
    log('8. 메인 thread 종료');
    
    go1(
        delay300(10),
        add10,
    );
}

f1();
