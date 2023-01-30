/**
 */
const __noop = () => {
};

/**
 */
const __catch_noop = arr => {
    arr.forEach(m => m instanceof Promise && m.catch(__noop));
    return arr;
}

/**
 */
const __nop = Symbol('nop');

/**
 */
const __go1 = (a, f) => a instanceof Promise
    ? a.then(f)
    : f(a);

/**
 */
const __curry = f => (a, ...args) => args.length === 0
    ? (...args) => f(a, ...args)
    : f(a, ...args);

/**
 */
const __take = __curry((n, iter) => {
    let ret = [];
    iter = iter[Symbol.iterator]();
    
    const recur = () => {
        while (true) {
            const item = iter.next();
            if (item.done) break;
            
            const val = item.value;
            if (val instanceof Promise) {
                return val
                    .then(m => {
                        ret.push(m);
                        if (ret.length >= n) return ret;
                        return recur();
                    })
                    .catch(e => {
                        if (e === __nop) return recur();
                        return Promise.reject(e)
                    });
            } else {
                ret.push(val);
                if (ret.length >= n)
                    return ret;
            }
        }
        return ret;
    }
    
    return recur();
});

/**
 */
const __take_all = __take(Infinity);

/**
 */
const L_range = function* (l) {
    let i = 0;
    while (i < l)
        yield i++;
};

/**
 */
const L_map = __curry(function* (f, iter) {
    iter = iter[Symbol.iterator]();
    
    while (true) {
        const item = iter.next();
        if (item.done) break;
        
        const m = item.value;
        yield __go1(m, f);
    }
});

/**
 */
const L_filter = __curry(function* (f, iter) {
    iter = iter[Symbol.iterator]();
    
    while (true) {
        const item = iter.next();
        if (item.done) break;
        
        const m = item.value;
        const b = __go1(m, f);
        if (b instanceof Promise) {
            yield b.then(b1 => b1 ? m : Promise.reject(__nop));
        } else {
            if (b) yield m;
        }
    }
});

/**
 */
const L_entries = function* (obj) {
    for (const k in obj)
        yield [k, obj[k]];
};

/**
 */
const L_keys = function* (obj) {
    for (const k in obj)
        yield k;
};

/**
 */
const L_values = function* (obj) {
    for (const m of obj)
        yield m;
};

/**
 */
const __is_iterable = m => m && m[Symbol.iterator];

/**
 */
const L_deep_flatten = function* (iter) {
    for (const m of iter) {
        if (__is_iterable(m)) yield* L_deep_flatten(m);
        else yield m;
    }
}

/**
 */
const L_flat_map = __curry((f, iter) => __go(
    iter,
    L_deep_flatten,
    L_map(f),
));

/**
 */
const __map = __curry((f, iter) => __go(
    iter,
    L_map(f),
    __take_all,
));

/**
 */
const __filter = __curry((f, iter) => __go(
    iter,
    L_filter(f),
    __take_all,
));

/**
 */
const __head = iter => __go1(__take(1, iter), ([m]) => m);

/**
 */
const __reduce = __curry((f, init, iter) => {
    if (!iter) {
        iter = init[Symbol.iterator]();
        return __reduce(f, __head(iter), iter);
    } else {
        iter = iter[Symbol.iterator]();
    }
    
    const inner = (ret, val, f) => {
        if (val instanceof Promise) {
            return val
                .then(m => f(ret, m))
                .catch(e => (e === __nop) ? ret : Promise.reject(e));
        } else {
            return f(ret, val);
        }
    };
    
    const recur = init => {
        let ret = init;
        while (true) {
            const item = iter.next();
            if (item.done) break;
            
            ret = inner(ret, item.value, f);
            if (ret instanceof Promise)
                return ret.then(recur);
        }
        return ret;
    };
    
    return __go1(init, recur);
});

/**
 */
const __go = (...args) => __reduce((arg, f) => f(arg), args);

/**
 */
const __pipe = (f, ...fn) => (...args) => __go(f(...args), ...fn);

/**
 */
const __sum = __curry((f, iter) => __go(
    iter,
    __map(f),
    __reduce((a, b) => a + b),
));

/**
 */
const __range = __pipe(L_range, __take_all);

/**
 */
const __join = __curry((sep = ',', iter) => {
    return __reduce((ret, m) => `${ret}${sep}${m}`, iter);
});

/**
 */
const __find = __curry((f, iter) => __go(
    iter,
    L_filter(f),
    __take(1),
    ([m]) => m,
));

/**
 */
const C_reduce = __curry((f, init, iter) => {
    const spread = __catch_noop(iter ? [...iter] : [...init]);
    return iter ? __reduce(f, init, spread) : __reduce(f, spread);
});

/**
 */
const C_take = __curry((l, iter) => {
    return __take(l, __catch_noop([...iter]));
});

/**
 */
const C_take_all = C_take(Infinity);

/**
 */
const C_map = __pipe(L_map, C_take_all);

/**
 */
const C_filter = __pipe(L_filter, C_take_all);

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
    join: __join,
    find: __find,
    is_iterable: __is_iterable,
};

const Lazy = {
    range: L_range,
    map: L_map,
    filter: L_filter,
    entries: L_entries,
    keys: L_keys,
    values: L_values,
    deep_flatten: L_deep_flatten,
    flat_map: L_flat_map,
};

const Concurrent = {
    take: C_take,
    take_all: C_take_all,
    reduce: C_reduce,
    map: C_map,
    filter: C_filter,
};

module.exports = {
    _: Strict,
    L: Lazy,
    C: Concurrent,
};
