/**
 * 함수형 프로그래밍은 가능한 에러를 일으키지 않고 납득할 만한 결과로 반환한다.
 * null 이 아닌 object 에 대해서만 진행한다.
 * function 은 포함되지 않는다.
 *
 * @param obj
 * @returns {string[]|*[]}
 * @private
 */
const _keys = obj => (typeof obj === 'object' && obj !== null)
    ? Object.keys(obj)
    : [];

/**
 * 배열뿐만 아니라 객체에 대해서도 적용한다.
 * 함수에 적용되는 것은 값이다.
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
 * 예외 상황에 대하여 에러를 발생시키지 않고 빈 배열을 반환한다.
 *
 * @param data
 * @param cond
 * @returns {*[]}
 */
const _filter = _curryr((data, cond) => {
    const ret = [];
    _each(data, d => cond(d) && ret.push(d));
    return ret;
});

/**
 * 예외 상황에 대하여 에러를 발생시키지 않고 빈 배열을 반환한다.
 *
 * @param data
 * @param convert
 * @returns {*[]}
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
 * 함수들의 배열을 인자로 받는 특수한 reduce 이다.
 *
 * @param fns
 * @returns {function(*): *}
 * @private
 */
const _pipe = (...fns) => arg => {
    return _reduce(fns, (arg, fn) => fn(arg), arg);
};

/**
 * 첫번째 함수 인자가 주어진 특수한 pipe 이다.
 *
 * @param arg
 * @param fns
 * @returns {*}
 * @private
 */
const _go = (arg, ...fns) => {
    return _pipe(...fns)(arg);
};

/**
 *
 * @param obj
 * @param key
 * @returns {undefined|*}
 */
const _get = _curryr((obj, key) => {
    return obj == null ? undefined : obj[key];
});

/**
 * 항등함수
 *
 * @param m
 * @private
 */
const _identity = m => m;

/**
 * 부정함수
 *
 * @param cond
 * @returns {function(*): boolean}
 * @private
 */
const _negate = cond => (arg => !cond(arg));

/**
 * 객체에서 값만을 뽑아낸다.
 *
 * @type {*|(function(*): *)}
 * @private
 */
const _values = _map(_identity);

/**
 * 배열에서 각 요소의 특정 속성만을 뽑아내어 배열을 만든다.
 *
 * @type {function(*, *): (*|(function(*): *))}
 * @private
 */
const _pluck = _curryr((data, key) => {
    return _map(data, get(key));
});

/**
 *
 * @param data
 * @param cond
 * @private
 */
const _reject = _curryr((data, cond) => {
    return _filter(data, _negate(cond));
});

/**
 *
 * @private
 */
const _compact = _filter(_identity);

/**
 *
 * @param data
 * @param cond
 * @returns {*}
 * @private
 */
const _find = _curryr((data, cond) => {
    const list = _keys(data);
    for (let i = 0; i < list.length; i++) {
        const m = data[list[i]];
        if (cond(m)) return m;
    }
    return null;
});

/**
 *
 * @param data
 * @param cond
 * @returns {number|*}
 * @private
 */
const _find_index = _curryr((data, cond) => {
    const list = _keys(data);
    for (let i = 0; i < list.length; i++) {
        const m = data[list[i]];
        if (cond(m)) return list[i];
    }
    return -1;
});

/**
 *
 * @param data
 * @param cond
 * @returns {boolean}
 * @private
 */
const _some = _curryr((data, cond) => {
    const list = keys(data);
    for (let i = 0; i < list.length; i++) {
        const m = data[list[i]];
        if (cond(m)) return true;
    }
    return false;
});

/**
 *
 * @param data
 * @param cond
 * @returns {boolean}
 * @private
 */
const _every = _curryr((data, cond) => {
    return _find_index(data, _negate(cond)) === -1;
});

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
    negate: _negate,
    values: _values,
    pluck: _pluck,
    reject: _reject,
    compact: _compact,
    find: _find,
    find_index: _find_index,
    some: _some,
    every: _every,
}
