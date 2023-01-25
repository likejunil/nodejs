const iter = require('../data/data.js');
const {_, L} = require('../lib/fp.js');

const f1 = (n) => {
    _.go(
        _.range(n),
        _.map(m => m * m),
        _.filter(m => m % 2),
        _.take(5),
        console.log,
    );
};

const f2 = (n) => {
    _.go(
        L.range(n),
        L.map(m => m * m),
        L.filter(m => m % 2),
        _.take(5),
        console.log,
    );
};

const time = (func, arg, label) => {
    console.time(label);
    func(arg);
    console.timeEnd(label);
}

time(f1, 10_000_000, 'strict');
time(f2, 10_000_000, 'lazy');
