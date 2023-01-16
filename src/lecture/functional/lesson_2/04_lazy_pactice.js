/**
 * query_str
 * join
 * entries
 * find
 * L.map 으로 _.map 작성
 * L.filter 으로 _.filter 작성
 * take_all
 *
 * L.flatten
 * is_iterable
 * L.deep_flatten
 *
 * L.flat_map
 *
 */

const {_, L} = require('./fp.js');

const obj = {
    animal: 'cat',
    color: 'yellow',
    age: 48,
};

_.go(
    obj,
    Object.entries,
    L.map(([k, v]) => `${k}=${v}`),
    _.take_all,
    _.reduce((ret, m) => `${ret}&${m}`),
    console.log,
);

// ==> animal=cat&color=yellow&