/**
 */
const _is_object = obj => typeof obj === 'object' && obj !== null;

/**
 * 함수형 프로그래밍은 가능한 에러를 일으키지 않고 납득할 만한 결과로 반환한다.
 * null 이 아닌 object 에 대해서만 진행한다.
 * function 은 포함되지 않는다.
 */
const _keys = obj => _is_object(obj) ? Object.keys(obj) : [];

/**
 * 배열뿐만 아니라 객체에 대해서도 적용한다.
 * 함수에 적용되는 것은 값이다.
 */
const _each = (data, func) => {
    const keys = _keys(data);
    for (let i = 0; i < keys.length; i++) {
        func(data[keys[i]]);
    }
};

/**
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
 */
const _filter = _curryr((data, cond) => {
    const ret = [];
    _each(data, d => cond(d) && ret.push(d));
    return ret;
});

/**
 * 예외 상황에 대하여 에러를 발생시키지 않고 빈 배열을 반환한다.
 */
const _map = _curryr((data, convert) => {
    const ret = [];
    _each(data, d => ret.push(convert(d)));
    return ret;
});

/**
 */
const _rest = (list) => {
    return Array.prototype.slice.call(list, 1);
};

/**
 */
const _reduce = (data, func, start) => {
    if (data.length === 0)
        return null;
    let ret = start != null ? start : data[0];
    const list = start != null ? data : _rest(data);
    _each(list, m => (ret = func(ret, m)));
    return ret;
};

/**
 * 함수들의 배열을 인자로 받는 특수한 reduce 이다.
 */
const _pipe = (...fns) => {
    return arg => {
        return _reduce(fns, (arg, fn) => fn(arg), arg);
    };
}

/**
 * 첫번째 함수 인자가 주어진 특수한 pipe 이다.
 */
const _go = (arg, ...fns) => {
    return _pipe(...fns)(arg);
};

/**
 */
const _get = _curryr((obj, key) => {
    return _is_object(obj) ? obj[key] : undefined;
});

/**
 * 항등함수
 */
const _identity = m => m;

/**
 * 인자로 주어진 함수의 부정 함수를 돌려주는 함수
 */
const _negate = cond => (arg => !cond(arg));

/**
 * 객체에서 값만을 뽑아낸다.
 */
const _values = _map(_identity);

/**
 * 배열에서 각 요소의 특정 속성만을 뽑아내어 배열을 만든다.
 */
const _pluck = _curryr((data, property) => {
    return _map(data, _get(property));
});

/**
 */
const _reject = _curryr((data, cond) => {
    return _filter(data, _negate(cond));
});

/**
 */
const _compact = _filter(_identity);

/**
 */
const _find_each = (data, cond) => {
    const keys = _keys(data);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = data[key];
        if (cond(val)) {
            const ret = {};
            ret[key] = val;
            return ret;
        }
    }
};

/**
 */
const _find = _curryr((data, cond) => {
    const ret = _values(_find_each(data, cond));
    if (ret.length > 0)
        return ret[0];
});
const _find_value = _find;

/**
 */
const _find_index = _curryr((data, cond) => {
    const ret = _keys(_find_each(data, cond));
    if (ret.length > 0)
        return ret[0];
    return -1;
});
const _find_key = _find_index;

/**
 */
const _some = _curryr((data, cond) => {
    return !!(_find_each(data, cond));
});

/**
 */
const _every = _curryr((data, cond) => {
    return (_find_index(data, _negate(cond)) === -1);
});

/**
 */
const _min = data => {
    return _reduce(data, (a, b) => a > b ? b : a);
};

/**
 */
const _max = data => {
    return _reduce(data, (a, b) => a > b ? a : b);
};

/**
 */
const _min_by = _curryr((data, func) => {
    return _reduce(data, (a, b) => func(a) > func(b) ? b : a);
});

/**
 */
const _max_by = _curryr((data, func) => {
    return _reduce(data, (a, b) => func(a) > func(b) ? a : b);
});

const _group_by = _curryr((data, func) => {
    return reduce(data, (ret, m) => {
        const key = func(m);
        ret[key] = ret[key] || [];
        ret[key].push(m);
        return ret;
    }, {});
});

const _count_by = _curryr((data, func) => {
    return reduce(data, (ret, m) => {
        const key = func(m);
        ret[key] = ret[key] || 0;
        ret[key] += 1;
        return ret;
    }, {});
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
    find_value: _find_value,
    find_index: _find_index,
    find_key: _find_key,
    some: _some,
    every: _every,
    min: _min,
    max: _max,
    min_by: _min_by,
    max_by: _max_by,
    group_by: _group_by,
    count_by: _count_by,
}
