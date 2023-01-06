const _curry = (func) => {
    return (a, b) => {
        // b 인자에 null 을 전달해야 할 경우도 있으므로..
        return b !== undefined
            ? func(a, b)
            : (b) => func(a, b);
    }
};

const _curryr = (func) => {
    return (a, b) => {
        // b 인자에 null 을 전달해야 할 경우도 있으므로..
        return b !== undefined
            ? func(a, b)
            : (b) => func(b, a);
    }
};

const _get = _curryr((obj, key) => {
    return obj == null ? undefined : obj[key];
});

const _each = (list, func) => {
    const keys = (typeof list === 'object' && !!list) ? Object.keys(list) : [];
    for (let i = 0; i < keys.length; i++) {
        func(list[keys[i]]);
    }
};

const _filter = _curryr((list, cond) => {
    const ret = [];
    _each(list, (val) => cond(val) && ret.push(val));
    return ret;
});

const _map = _curryr((list, convert) => {
    const ret = [];
    _each(list, (val) => ret.push(convert(val)));
    return ret;
});

const _rest = (list) => {
    return Array.prototype.slice.call(list, 1);
};

const _reduce = (list, func, start) => {
    let value = start != null ? start : list[0];
    const input = start != null ? list : _rest(list);
    _each(input, (val) => value = func(value, val), 0);
    return value;
};

module.exports = {
    each: _each,
    filter: _filter,
    map: _map,
    curry: _curry,
    curryr: _curryr,
    get: _get,
    rest: _rest,
    reduce: _reduce,
}
