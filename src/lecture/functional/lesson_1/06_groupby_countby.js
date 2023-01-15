const data = require('../data/data.js');
const {go, reduce, pluck, curryr} = require('./fp.js');

/**
 * _group_by
 * _count_by
 * _push
 * _pairs
 */

const _group_by = curryr((list, func) => {
    return reduce(list, (ret, m) => {
        const key = func(m);
        ret[key] = ret[key] ?? [];
        ret[key].push(m);
        return ret;
    }, {});
});
go(data,
    _group_by(m => m.group),
    console.log,
    );

const _count_by = curryr((list, func) => {
    return reduce(list, (ret, m) => {
        const key = func(m);
        ret[key] = ret[key] ?? 0;
        ret[key] += 1;
        return ret;
    }, {});
});
go(data,
    _count_by(m => m.group),
    console.log,
);

