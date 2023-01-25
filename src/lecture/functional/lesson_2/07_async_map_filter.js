const {_, L} = require('../lib/fp.js');
const log = console.log;

const f1 = () => {
    _.go(
        [
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3),
            4,
            Promise.resolve(5),
            6,
        ],
        L.map(m => m + 10),
        _.take_all,
        log,
    );
};

const f2 = () => {
    _.go(
        [
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3),
            4,
            Promise.resolve(5),
            6,
        ],
        L.map(m => m + 10),
        L.filter(m => m % 2 === 0),
        L.map(m => Promise.resolve(m * m)),
        L.filter(m => Promise.resolve(m % 2 === 0)),
        _.take_all,
        log,
    );
};

const f3 = () => {
    const add = (a, b) => a + b;
    _.go(
        [1, 2, 3, 4, 5],
        L.map(m => Promise.resolve(m * m)),
        L.filter(m => Promise.resolve(m % 2 === 0)),
        _.reduce(add),
        log,
    );
};

f1();
f2();
f3();
