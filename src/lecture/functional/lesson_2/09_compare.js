const {_, L, C} = require('../lib/fp.js');

const log = console.log;
const delay100 = m => new Promise(resolve => setTimeout(() => resolve(m), 100));

const f1 = iter => {
    return _.go(
        iter,
        L.map(m => delay100(m * m)),
        L.filter(m => delay100(m % 2 === 0)),
        L.map(m => delay100(m + 1)),
        C.take(3),
        _.reduce((a, b) => a + b),
        log,
    );
};

const f2 = async iter => {
    const temp = [];
    for (const a of iter) {
        const b = await delay100(a * a);
        if (await delay100(b % 2 === 0)) {
            temp.push(await delay100(b + 1));
            if (temp.length >= 3)
                break;
        }
    }
    
    let total = temp[0];
    for (let i = 1; i < temp.length; i++) {
        total += temp[i];
    }
    
    return total;
};

const l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
f1(l);
// f2(l).then(log);
