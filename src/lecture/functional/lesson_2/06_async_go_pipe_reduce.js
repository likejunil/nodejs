const {_, L} = require('../lib/fp.js');
const log = console.log;

const l_go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const l_reduce = _.curry((f, init, iter) => {
    if (iter === undefined) {
        iter = init[Symbol.iterator]();
        init = iter.next().value;
    }
    
    const l_recur = (init) => {
        let ret = init;
        for (const m of iter) {
            ret = f(ret, m);
            if (ret instanceof Promise) {
                return ret.then(l_recur);
            }
        }
        return ret;
    };
    
    return l_go1(init, l_recur);
});

const l_go = (...args) => {
    return l_reduce((arg, f) => f(arg), args);
};

l_go(
    Promise.resolve(1),
    m => Promise.resolve(m + 10),
    m => Promise.resolve(m + 100),
    m => m + 1000,
    m => m > 10000 ? Promise.reject('너무 크다.') : m + 10000,
    log,
).catch(log);

_.go(
    Promise.resolve(1),
    m => m + 10,
    m => Promise.resolve(m + 100),
    m => m + 1000,
    m => m > 10000 ? Promise.reject('너무 크다.') : m + 10000,
    log,
).catch(log);
