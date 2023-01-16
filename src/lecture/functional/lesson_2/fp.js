/**
 */
const __curry = f => (a, ...args) => {
    return args.length === 0
        ? (...args) => f(a, ...args)
        : f(a, ...args);
}

/**
 */
const __map = __curry((f, iter) => {
    const ret = [];
    for (const m of iter) {
        ret.push(f(m));
    }
    return ret;
});

/**
 */
const __filter = __curry((f, iter) => {
    const ret = [];
    for (const m of iter) {
        if (f(m)) {
            ret.push(m);
        }
    }
    return ret;
});

/**
 */
const __reduce = __curry((f, init, iter) => {
    if (iter === undefined) {
        iter = init[Symbol.iterator]();
        init = iter.next().value;
    }
    
    let ret = init;
    for (const m of iter) {
        ret = f(ret, m);
    }
    return ret;
});

/**
 */
const __go = (...args) => {
    return __reduce((arg, f) => f(arg), args);
};

/**
 */
const __pipe = (f, ...fn) => (...arg) => {
    return __go(f(...arg), ...fn);
};

/**
 */
const __sum = __curry((f, iter) => __go(
    iter,
    __map(f),
    __reduce((a, b) => a + b),
));

/**
 */
const __range = (l) => {
    const ret = [];
    for (let i = 0; i < l; i++) {
        ret.push(i);
    }
    return ret;
};

/**
 */
const __take = __curry((n, iter) => {
    let ret = [];
    for (const m of iter) {
        ret.push(m);
        if (ret.length >= n) {
            return ret;
        }
    }
    return ret;
});

/**
 */
const __take_all = __take(Infinity);

const Strict = {
    curry: __curry,
    map: __map,
    filter: __filter,
    reduce: __reduce,
    go: __go,
    pipe: __pipe,
    sum: __sum,
    range: __range,
    take: __take,
    take_all: __take_all,
};

/**
 */
const L_range = function* (l) {
    let i = 0;
    while (i < l) {
        yield i++;
    }
};

/**
 */
const L_map = __curry(function* (f, iter) {
    for (const m of iter) {
        yield f(m);
    }
});

/**
 */
const L_filter = __curry(function* (f, iter) {
    for (const m of iter) {
        if (f(m)) {
            yield m;
        }
    }
});

/**
 */
const L_reduce = __curry(function* (f, init, iter) {
    if (iter === undefined) {
        iter = init[Symbol.iterator]();
        init = iter.next().value;
    }
    
    let ret = init;
    for (const m of iter) {
        ret = f(ret, m);
        yield ret;
    }
});

const Lazy = {
    range: L_range,
    map: L_map,
    filter: L_filter,
    reduce: L_reduce,
    
};

module.exports = {
    _: Strict,
    L: Lazy,
};
