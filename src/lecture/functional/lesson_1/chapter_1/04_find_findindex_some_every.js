const data = require('./data.js');
const {go, keys, map, filter, get, identity, negate} = require('./fp.js');

/**
 * _values
 * _pluck
 * _reject
 * _compact
 * _find
 * _find_index
 * _some
 * _every
 */

/*
const _values = (data) => {
    // return map(data, identity);
    return map(identity)(data);
};
 */
const _values = map(identity);
console.log(data[1]);
console.log(_values(data[1]));
console.log(data[2]);
console.log(_values(data[2]));


const _pluck = (data, key) => map(data, get(key))
console.log(_pluck(data, 'name'));
console.log(_pluck(data, 'age'));


const _reject = (data, cond) => {
    return filter(data, negate(cond));
};
console.log(_reject(data, m => m.age < 30));


/*
const _compact = data => {
    // filter(data, identity);
    return filter(identity)(data);
};
 */
const _compact = filter(identity);
console.log(_compact([0, false, null, undefined, {}, []]));


const _find = (data, cond) => {
    const list = keys(data);
    for (let i = 0; i < list.length; i++) {
        const m = data[list[i]];
        if (cond(m)) return m;
    }
};
console.log(_find(data, m => m.name === '강백호'));
console.log(_find(data, m => m.name === '송송송'));


const _find_index = (data, cond) => {
    const list = keys(data);
    for (let i = 0; i < list.length; i++) {
        const m = data[list[i]];
        if (cond(m)) return list[i];
    }
    return -1;
};
console.log(_find_index(data, m => m.name === '송태섭'));
console.log(_find_index(data, m => m.name === '조로'));
console.log(_find_index(data, m => m.name === '권준일'));


const _some = (data, cond) => {
    const list = keys(data);
    for (let i = 0; i < list.length; i++) {
        const m = data[list[i]];
        if (cond(m)) return true;
    }
    return false;
};
console.log(_some(data, m => m.age > 100));
console.log(_some(data, m => m.age < 0));


const _every = (data, cond) => {
    return _find_index(data, negate(cond)) === -1;
};
console.log(_every(data, m => m.age > 100));
console.log(_every(data, m => m.age > 0));



