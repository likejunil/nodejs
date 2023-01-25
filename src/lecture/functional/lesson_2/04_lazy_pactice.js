/**
 * query_str
 * entries
 * join
 *
 * find
 * L.map 으로 _.map 작성
 * L.filter 으로 _.filter 작성
 * take_all
 *
 * L.flatten
 * is_iterable
 * L.deep_flatten
 * L.flat_map
 */

const data = require('../data/data.js');
const {_, L} = require('../lib/fp.js');
const log = console.log;

const entries = function* (obj) {
    for (const m in obj) {
        yield [m, obj[m]];
    }
};

const join = _.curry((sep = ',', iter) => {
    return _.reduce((ret, m) => `${ret}${sep}${m}`, iter);
});

// 객체는 iterable 이 아니다.
// 따라서 iterable 한 자료구조로 변경해야 한다.
// 대표적으로 array, map, set 등이 있다.
const query_str = _.pipe(
    entries,
    L.map(([k, v]) => `${k}=${v}`),
    join('&'),
);

const f1 = () => {
    const cat = {
        name: 'sun',
        color: 'yellow',
        age: 48,
    };
    
    log(query_str(cat));
};

const find = _.curry((cond, iter) => _.go(
    iter,
    L.filter(cond),
    _.take(1),
    ([m]) => m,
));

const f2 = () => {
    log(find(m => m.age > 30, data));
    log(_.find(m => m.age > 30, data));
};

const map = _.curry((f, iter) => _.go(
    iter,
    L.map(f),
    _.take_all,
));

const filter = _.curry((f, iter) => _.go(
    iter,
    L.filter(f),
    _.take_all,
));

const f3 = () => {
    _.go(
        data,
        filter(m => m.age > 30),
        map(m => m.name),
        log,
    );
};

const nested = [[1, 2], 3, 4, [5, 6, [7, [8, 9]]]];

const is_iterable = m => {
    return m && m[Symbol.iterator];
};

function* flatten(iter) {
    for (const m of iter) {
        if (is_iterable(m)) {
            // for (const n of m) yield n;
            yield* m;
        } else {
            yield m;
        }
    }
}

function* deep_flatten(iter) {
    for (const m of iter) {
        if (is_iterable(m)) {
            yield* deep_flatten(m);
        } else {
            yield m;
        }
    }
}

const f4 = () => {
    _.go(
        nested,
        flatten,
        _.take_all,
        log,
    );
    
    log([...flatten(nested)]);
    
    log(_.take(5, deep_flatten(nested)));
}

const flat_map = _.curry((f, iter) => _.go(
    iter,
    deep_flatten,
    L.map(f),
));

const f5 = () => {
    _.go(
        nested,
        flat_map(m => m * 10),
        _.take_all,
        log,
    );
}

// f1();
// f2();
// f3();
// f4();
f5();