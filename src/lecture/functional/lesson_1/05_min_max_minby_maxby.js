const data = require('../data/data.js');
const {go, reduce, pluck, curryr} = require('./fp.js');

/**
 * _min
 * _max
 * _min_by
 * _max_by
 */

const _min = list => {
    return reduce(list, (a, b) => a > b ? b : a);
};
go(data,
    pluck('age'),
    _min,
    console.log,
);

const _max = list => {
    return reduce(list, (a, b) => a > b ? a : b);
};
go(data,
    pluck('age'),
    _max,
    console.log,
);

const min_by = curryr((list, func) => {
    return reduce(list, (a, b) => func(a) > func(b) ? b : a);
});
go(data,
    min_by(m => m.age),
    console.log,
);

const max_by = curryr((list, func) => {
    return reduce(list, (a, b) => func(a) > func(b) ? a : b);
});
go(data,
    max_by(m => m.age),
    console.log,
);



