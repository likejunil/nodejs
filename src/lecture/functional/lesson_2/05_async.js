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
 * - g(x) 를 실행하는 과정에서 에러가 발생하면, f(g(x)) 를 실행해도 같은 에러가 발생하도록 처리
 */

const {_, L} = require('../lib/fp.js');
const log = console.log;

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const add10 = a => a + 10;

const delay100 = a => new Promise(resolve =>
    setTimeout(() => resolve(a), 100));

const f1 = () => {
    /**
     * 30
     * 30
     * undefined
     */
    const n1 = 20;
    go1(go1(n1, add10), log);
    log(go1(go1(n1, add10), log));
    
    /**
     * Promise { <pending> }
     * 30
     * 30
     */
    const n2 = delay100(20); // Promise 를 반환한다.
    go1(go1(n2, add10), log); // Promise.resolve(20).then(add10).then(log)
    log(go1(go1(n2, add10), log)); // log(Promise.resolve(20).then(add10).then(log))
}

const users = [
    {id: 1, name: '강백호'},
    {id: 2, name: '서태웅'},
    {id: 3, name: '채치수'},
    {id: 4, name: '송태섭'},
    {id: 5, name: '정대만'},
];

const f = ({name}) => name;
const g = id => _.find(user => user.id === id, users) || Promise.reject('not found');
const fg = id => Promise.resolve(id).then(g).then(f);

const f2 = () => {
    log(g(5));
    fg(5).then(log);
};

const f3 = () => {
    users.pop();
    g(5).catch(log);
    fg(5).catch(log);
};

// f1();
// f2();
f3();
