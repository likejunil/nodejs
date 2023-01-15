const data = require('../data/data.js');
const {reduce, filter, map, get} = require('./fp.js');

/**
 * _pipe
 * _go
 * _key (_each 에 적용)
 * _identity
 * _negative
 * error 처리
 */

/**
 * _pipe 는 함수를 반환한다.
 * 인자로 받은 함수들을 연결하여 실행하는 함수를 반환한다.
 */
const _pipe = (...fns) => arg => reduce(fns, (arg, fn) => fn(arg), arg);
const f1 = _pipe(a => a + 1,
    a => a * 2,
    a => a ** 2);
console.log(f1(4));

/**
 * _go 는 _pipe 에 최초 인자를 전달하여 바로 실행할 수 있는 함수이다.
 * _pipe 는 함수를 반환하지만, _go 는 함수들을 실행한 결과값을 반환한다.
 */
const _go = (arg, ...fns) => _pipe(...fns)(arg);
console.log(_go(10, a => a * 10, a => a ** 2));

_go(data,
    filter(user => user.age > 30),
    map(get('name')),
    console.log,
);

_go([],
    filter(user => user.age > 30),
    map(get('name')),
    console.log,
);
