/**
 * 기본적으로 console 객체는 로그를 남기고 디버깅을 하기 위해 사용한다.
 *
 * 1. console 객체는 레벨에 따른 로그를 남길 수 있다.
 *  - debug()
 *  - log()
 *  - info()
 *  - warn()
 *  - error()
 *
 * 2. 조건에 따른 로그를 남길 수 있다.
 *  - assert(조건, 메시지) // 조건이 거짓이어야만 메시지가 기록된다.
 *
 * 3. 정보의 출력 포멧이 다양한다.
 *  - dir()
 *  - table()
 *
 * 4. 시간 측정이 가능하다.
 *  - time(식별자), timeEnd(식별자)
 *
 * 5. 특정 부분의 실행 회수를 추적할 수 있다.
 *  - count(식별자)
 *
 * 6. 호출된 함수의 stack 을 추적할 수 있다.
 *  - trace()
 */

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