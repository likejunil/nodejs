const data = require('./data.js');
const {filter, map, each} = require('./fp.js');

/**
 * _curry
 * _curryr
 * _get
 * _reduce
 * _rest
 */

const _curry = (func) => {
    return (a, b) => {
        // b 인자에 null 을 전달해야 할 경우도 있으므로..
        return b !== undefined
            ? func(a, b)
            : (b) => func(a, b);
    }
}

const add = _curry((a, b) => a + b);
console.log(add(3, 7));
const add5 = add(5);
console.log(add5(3));
console.log(add(2)(4));
console.log(add(2, 4));

const _curryr = (func) => {
    return (a, b) => {
        // b 인자에 null 을 전달해야 할 경우도 있으므로..
        return b !== undefined
            ? func(a, b)
            : (b) => func(b, a);
    }
}
const sub = _curryr((a, b) => a - b);
const sub10 = sub(10);
console.log(sub10(21));


const _get = _curryr((obj, key) => {
    return obj == null ? undefined : obj[key];
});
console.log(_get(data[2], 'name'));
const get_name = _get('name');
console.log(get_name(data[3]));
console.log(get_name(data[4]));

const get_age = _get('age');
console.log(get_age(data[3]));
console.log(get_age(data[4]));

console.log(
    map(
        filter(data, (val) => val.age > 30),
        get_name,
    )
);

const _rest = (list) => {
    return Array.prototype.slice.call(list, 1);
}

const _reduce = (list, func, init) => {
    let total = init != null ? init : list[0];
    const input = init != null ? list : _rest(list);
    each(input, (val) => total = func(total, val), 0);
    return total;
}

console.log(_reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0));
console.log(_reduce([1, 2, 3, 4, 5], (a, b) => a + b));

