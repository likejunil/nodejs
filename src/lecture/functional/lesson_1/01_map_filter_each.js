const data = require('./data.js');

/**
 * << pure function >>
 *  1. 같은 입력에 대해 항상 같은 결과를 반환한다.
 *  2. 외부에 어떠한 영향도 미치지 않는다.
 *
 * _map
 * _filter
 * _each
 */

// 30세 이상
(function () {
    const tmp_users = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].age >= 30) {
            tmp_users.push(data[i])
        }
    }
    console.log(tmp_users);
})();

// 30세 미만
(function () {
    const tmp_users = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].age < 30) {
            tmp_users.push(data[i])
        }
    }
    console.log(tmp_users);
})();

/**
 * _filter
 *  - 순수함수의 조합으로 진행된다.
 *  - 중복되는 코드를 없앤다.
 */
const less30 = (user) => user.age < 30;
const over30 = (user) => user.age >= 30;
const _filter1 = (data, cond) => {
    const tmp_users = [];
    for (let i = 0; i < data.length; i++) {
        if (cond(data[i])) {
            tmp_users.push(data[i])
        }
    }
    return tmp_users;
}

console.log(_filter1(data, less30));
console.log(_filter1(data, over30));


// 나이만 선택
(function () {
    const ages = [];
    for (let i = 0; i < data.length; i++) {
        ages.push(data[i].age);
    }
    console.log(ages);
})();

// 이름만 선택
(function () {
    const names = [];
    for (let i = 0; i < data.length; i++) {
        names.push(data[i].name);
    }
    console.log(names);
})();

/**
 * _map
 *  - 순수함수의 조합으로 진행된다.
 *  - 중복되는 코드를 없앤다.
 */
const get_age = (user) => user.age;
const get_name = (user) => user.name;
const _map1 = (data, convert) => {
    const ages = [];
    for (let i = 0; i < data.length; i++) {
        ages.push(convert(data[i]));
    }
    return ages;
};

console.log(_map1(data, get_age));
console.log(_map1(data, get_name));

/**
 * _each
 *  - 순수함수의 조합으로 진행된다.
 *  - 중복되는 코드를 없앤다.
 */
const _each = (data, func) => {
    for (let i = 0; i < data.length; i++) {
        func(data[i]);
    }
}

const _filter = (data, cond) => {
    const ret = [];
    _each(data, (val) => cond(val) && ret.push(val));
    return ret;
};

console.log(_filter(data, less30));
console.log(_filter(data, over30));

const _map = (data, convert) => {
    const ret = [];
    _each(data, (val) => ret.push(convert(val)));
    return ret;
};

console.log(_map(data, get_age));
console.log(_map(data, get_name));
