const {_, L, C} = require('../lib/fp.js');
const log = console.log;

const args = _.range(10);
const delay1000 = m => new Promise(resolve => setTimeout(() => {
    log('프라미스 생성:', m);
    resolve(m);
}, 1000));
const even = m => m % 2 === 0;
const add = (a, b) => a + b;

const f1 = () => {
    const label = "f1";
    console.time(label);
    _.go(
        args,
        L.map(delay1000),
        L.filter(even),
        _.take(3),
        C.reduce(add),
        log,
        _ => console.timeEnd(label),
    );
};

const f2 = () => {
    const label = "f2";
    console.time(label);
    _.go(
        [0, 1, 2],
        L.map(delay1000),
        L.filter(even),
        C.reduce(add),
        log,
        _ => console.timeEnd(label),
    );
};

const f3 = () => {
    _.go(
        [1, 2, 3],
        L.map(delay1000),
        L.filter(even),
        L.map(delay1000),
        C.take(3),
        // C.reduce(add),
        log,
    );
};

f1();
// f2();
// f3();

