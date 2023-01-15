const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const range = _.range(100);
let map_count = 0;
let filter_count = 0;

const strict_func = () => {
    _.go(
        range,
        _.map(m => {
            map_count++;
            return m * m;
        }),
        _.filter(m => {
            filter_count++;
            return m % 2 === 0;
        }),
        _.take(5),
        console.log,
    );
};

const lazy_func = () => {
    _.go(
        range,
        L.map(m => {
            map_count++;
            return m * m;
        }),
        L.filter(m => {
            filter_count++;
            return m % 2 === 0;
        }),
        _.take(5),
        console.log,
    );
}

// strict_func();
lazy_func();
console.log('map_count =>', map_count);
console.log('filter_count =>', filter_count);
