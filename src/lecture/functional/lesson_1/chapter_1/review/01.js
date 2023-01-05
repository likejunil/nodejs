const data = require('../data.js');

const gt30 = (user) => {
    const ret = [];
    for (let i = 0; i < user.length; i++) {
        if (user[i].age > 30) {
            ret.push(user[i]);
        }
    }
    return ret;
};
console.log(gt30(data));

const loe30 = (user) => {
    const ret = [];
    for (let i = 0; i < user.length; i++) {
        if (user[i].age <= 30) {
            ret.push(user[i]);
        }
    }
    return ret;
};
console.log(loe30(data));

// 중복되는 코드가 너무 많고 범용적이지 못하다.
// 중복을 없애고 범용적으로 만든다.
const _filter = (list, cond) => {
    const ret = [];
    for (let i = 0; i < list.length; i++) {
        if (cond(list[i])) {
            ret.push(list[i]);
        }
    }
    return ret;
};

console.log(_filter(data, (m) => m.age > 30));
console.log(_filter(data, (m) => m.age <= 30));

const get_name = (user) => {
    const ret = [];
    for (let i = 0; i < user.length; i++) {
        ret.push(user[i].name);
    }
    return ret;
}
console.log(get_name(data));

const get_age = (user) => {
    const ret = [];
    for (let i = 0; i < user.length; i++) {
        ret.push(user[i].age);
    }
    return ret;
}
console.log(get_age(data));

// 중복되는 코드가 너무 많고 범용적이지 못하다.
// 중복을 없애고 범용적으로 만든다.
const _map = (list, mapper) => {
    const ret = [];
    for (let i = 0; i < list.length; i++) {
        ret.push(mapper(list[i]));
    }
    return ret;
};
console.log(_map(data, (m) => m.name));
console.log(_map(data, (m) => m.age));

// _filter, _map 에도 중복되는 코드가 많고 범용적이지 못하다.
// 중복을 없애고 범용적으로 만든다.
const each = (list, iter) => {
    for (let i = 0; i < list.length; i++) {
        iter(list[i]);
    }
};

const filter = (list, cond) => {
    const ret = [];
    each(list, (m) => {
        if (cond(m)) ret.push(m);
    });
    return ret;
};
console.log(filter(data, (m) => m.age > 30));
console.log(filter(data, (m) => m.age <= 30));

const map = (list, mapper) => {
    const ret = [];
    each(list, (m) => ret.push(mapper(m)));
    return ret;
};

console.log(map(data, (m) => m.name));
console.log(map(data, (m) => m.age));

console.log(map(
    filter(data, (m) => m.age > 30),
    (m) => m.name));

module.exports = {
    map,
    filter,
    each,
};
