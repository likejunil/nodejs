/**
 * 함수형 프로그래밍은 가능한 에러를 일으키지 않고 납득할 만한 결과로 반환한다.
 *
 * @param obj
 * @returns {string[]|*[]}
 * @private
 */
const _keys = obj => (typeof obj === 'object' && obj !== null)
    ? Object.keys(obj)
    : [];

/**
 *
 * @param data
 * @param func
 * @private
 */
const _each = (data, func) => {
    const keys = _keys(data);
    for (let i = 0; i < keys.length; i++) {
        func(data[keys[i]]);
    }
};

/**
 *
 * @param func
 * @returns {function(*, *): *|(function(*): *)}
 * @private
 */
const _curry = (func) => {
    return (a, b) => {
        // b 인자에 null 을 전달해야 할 경우도 있으므로..
        return b !== undefined
            ? func(a, b)
            : (b) => func(a, b);
    }
};

/**
 *
 * @param func
 * @returns {function(*, *): *|(function(*): *)}
 * @private
 */
const _curryr = (func) => {
    return (a, b) => {
        // b 인자에 null 을 전달해야 할 경우도 있으므로..
        return b !== undefined
            ? func(a, b)
            : (b) => func(b, a);
    }
};

/**
 *
 * @type {function(*, *): (*|(function(*): *))}
 * @private
 */
const _filter = _curryr((data, cond) => {
    const ret = [];
    _each(data, d => cond(d) && ret.push(d));
    return ret;
});

/**
 *
 * @type {function(*, *): (*|(function(*): *))}
 * @private
 */
const _map = _curryr((data, convert) => {
    const ret = [];
    _each(data, (d) => ret.push(convert(d)));
    return ret;
});

/**
 *
 * @param list
 * @returns []
 * @private
 */
const _rest = (list) => {
    return Array.prototype.slice.call(list, 1);
};

/**
 *
 * @param data
 * @param func
 * @param start
 * @returns {*}
 * @private
 */
const _reduce = (data, func, start) => {
    let ret = start != null ? start : data[0];
    const input = start != null ? data : _rest(data);
    _each(input, val => (ret = func(ret, val)));
    return ret;
};

/**
 *
 * @param fns
 * @returns {function(*): *}
 * @private
 */
const _pipe = (...fns) => arg => reduce(fns, (arg, fn) => fn(arg), arg);

/**
 *
 * @param arg
 * @param fns
 * @returns {*}
 * @private
 */
const _go = (arg, ...fns) => _pipe(...fns)(arg);

/**
 *
 * @type {function(*, *): (*|(function(*): *))}
 * @private
 */
const _get = _curryr((obj, key) => {
    return obj == null ? undefined : obj[key];
});

/**
 *
 * @param m
 * @private
 */
const _identity = m => m;

/**
 *
 * @param m
 * @returns {boolean}
 * @private
 */
const _negative = m => !m;

/**
 *
 * @param data
 * @returns {*|(function(*): *)}
 * @private
 */
const _values = data => _map(_identity);

module.exports = {
    keys: _keys,
    each: _each,
    curry: _curry,
    curryr: _curryr,
    map: _map,
    filter: _filter,
    rest: _rest,
    reduce: _reduce,
    pipe: _pipe,
    go: _go,
    get: _get,
    identity: _identity,
    negative: _negative,
    values: _values,
}
