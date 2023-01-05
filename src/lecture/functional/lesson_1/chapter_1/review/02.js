const data = require('../data.js');
const fp = require('./01.js');

const curry = (fn) => (a) => (b) => fn(a, b);
const curryr = (fn) => (a) => (b) => fn(b, a);

const add = curry((a, b) => a + b);
const add5 = add(5);
console.log(add5(4));

const sub = curryr((a, b) => a - b);
const sub10 = sub(10);
console.log(sub10(21));


// 함수형 프로그래밍은 순수 함수들의 매끄러운 흐름으로 진행된다.
// 에러가 발생하는 것보다는 합리적인 반환값으로 흐름을 이어간다.
const _get = (obj, key) => obj == null ? undefined : obj[key];

console.log(_get(data[1], 'name'));
console.log(_get(data[100], 'name'));
// console.log(data[100].name);

const get = curryr(_get);
const get_name = get('name');
console.log(get_name(data[1]));
console.log(get_name(data[2]));
const get_age = get('age');
console.log(get_age(data[1]));
console.log(get_age(data[2]));

fp.map(
    fp.filter(data, m => get_age(m) >= 30),
    console.log
);


const reduce = (list, func, init) => {
    let prev = init != null ? init : list[0];
    const data = init != null ? list : Array.prototype.slice.call(list, 1);
    fp.each(data, (curr) => prev = func(prev, curr));
    return prev;
};

console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b, 1));
console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b));

module.exports = {
    get,
    reduce,
};
