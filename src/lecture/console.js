// 로그 레벨
console.clear();
console.debug('debug');
console.log('log');
console.info('info');
console.warn('warn');
console.error('error');

// 조건에 따라 기록(출력)
console.assert(1 === 1, 'right🔥');
console.assert(1 === 2, 'wrong❄️');

// 출력하는 방식
const june = {
    name: '준일', age: 48, family: [{name: '효진', age: 43}, {name: '강', age: 11},],
}
console.log(june);
console.table(june);
console.dir(june, {showHidden: true, colors: false, depth: 2});

// 타임 측정
console.time('label-1');
let sum = 0;
for (let i = 0; i < 100; i++) {
    sum += i;
}
console.timeEnd('label-1');

// 횟수 세기
console.count('label-2');
console.count('label-2');
console.count('label-2');
console.countReset('label-2');
console.count('label-2');

// 함수 호출 추적하기
const f1 = () => console.trace();
const f2 = () => f1();
const f3 = () => f2();
f3();