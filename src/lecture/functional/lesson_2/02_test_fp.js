const {_} = require('./fp.js');
const iter = require('../data/data.js');

const f0 = () => {
    // 읽기가 힘든 코드
    console.log(
        _.reduce((a, b) => a + b,
            _.map(m => m.age,
                _.filter(m => m.age > 30,
                    iter))));
};

const f1 = () => {
    // 일기가 쉬운 코드
    _.go(
        iter,
        _.filter(m => m.age > 30),
        _.map(m => m.age),
        _.reduce((a, b) => a + b),
        console.log,
    );
};

const f2 = () => {
    // 함수들을 조합하여 분리
    const age_gt30 = _.pipe(
        _.filter(m => m.age > 30),
        _.map(m => m.age),
        _.reduce((a, b) => a + b),
    );
    
    _.go(
        iter,
        age_gt30,
        console.log,
    );
};

const f3 = () => {
    _.go(
        iter,
        _.map(m => m.age),
        _.reduce((a, b) => a + b),
        console.log,
    );
    
    _.go(
        iter,
        _.map(m => m.pow),
        _.reduce((a, b) => a + b),
        console.log,
    );
    
    // sum 이라는 일반적인 함수 생성
    const add = (a, b) => a + b;
    const sum = _.curry((f, iter) => _.go(
        iter,
        _.map(f),
        _.reduce(add),
        console.log,
    ));
    
    const get_age = (m) => m.age;
    const get_pow = (m) => m.pow;
    sum(get_age, iter);
    sum(get_pow, iter);
    
    const total_age = sum(get_age);
    total_age(iter);
    const total_pow = sum(get_pow);
    total_pow(iter);
};

f0();
f1();
f2();
f3();