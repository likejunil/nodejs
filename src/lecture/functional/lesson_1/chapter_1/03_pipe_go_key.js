const data = require('./data.js');
const {filter, map, each} = require('./01_map_filter_each.js');
const {reduce} = require('./02_curry_get_reduce.js');

/**
 * _pipe
 * _go
 * error 처리
 * _key (_each 에 적용)
 * _identity
 */
 
const list = [
    a => a + a,
    a => a * a,
];

const func = (arg, fn) => fn(arg);

const ret = reduce(list, func, 1);
console.log(ret);
