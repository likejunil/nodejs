/**
 * 1.
 * global 은 전역 객체이다 .
 * 프로그램이 실행되면 가장 먼저 생성되는 객체이다.
 * 어떤 모듈이든 모두 접근할 수 있는 공통 객체이다.
 * global 객체의 속성에 접근할 때 global 이름은 생략이 가능하다.
 *
 * 2.
 * var 선언 변수는 global 객체의 속성이 된다.
 * 변수명만 사용할 경우 암묵적으로 var 가 선언된다.
 * let, const 선언 변수는 global 객체의 속성이 아니다.
 * 모듈 내의 전역에서 선언한 함수는 global 의 속성이 아니다.
 * 하지만 일반 함수 내의 this 는 global 을 가리킨다.
 *
 * 일반적으로 this === module.exports === exports 이다.
 * 하지만 일반 함수의 내부에서 this 는 global 이다.
 *
 * 3.
 * console 객체 역시 global 객체의 속성이다.
 * setTimer, setInterval, setImmediate, clear* 모두 global 객체의 속성이다.
 *
 * 4.
 * 일반 함수는 도대체 어떤 객체의 속성일까?
 * __dirname 과 같은 속성은 어떤 객체의 속성일까?
 */

// 1.
// global 객체에 임의이 속성을 할당할 수 있다.
// global 객체는 어디서나 접근이 가능하고, global 이름을 생략할 수 있다.
global.hello = () => console.log('안녕하세요~!');
global.hello();
hello();
console.log('************************************************');

// 2.
// 모듈 내의 전역에서 선언한 var 변수는 global 객체의 속성이 된다.
// 변수명만 사용할 경우 암묵적으로 var 가 사용된다.
animal = 'cat';
console.log('var animal :', animal);
console.log('global.animal :', global.animal);
console.log('************************************************');

// const, let 의 경우는 global 객체의 속성이 되지 않는다.
const color = 'black';
let planet = 'earth';
console.log('const color :', color);
console.log('global.color :', global.color);
console.log('let planet :', planet);
console.log('global.planet :', global.planet);
console.log('************************************************');

// 그냥 정의한 함수도 global 의 속성이 되지 않는다.
// 하지만 해당 함수의 this 는 global 이다.
function add1(a, b) {
    console.log('일반 함수의 경우, this === global :', this === global);
    console.log(global.add1 === undefined);
    return a + b;
}

console.log(add1(1, 2));

const add2 = (a, b) => {
    console.log('화살표 함수의 경우, this === module.exports :', this === module.exports);
    console.dir(module.exports);
    return a + b;
}
console.log(add2(1, 2));
console.log('************************************************');

function outer() {
    console.log('outer 에서의 this === global :', this === global);
    const inner1 = () => console.log('inner1 에서의 this === global :', this === global);
    const inner2 = function () {
        console.log('inner2 에서의 this :', this);
    }
    return {inner1: inner1, inner2: inner2,};
}

const obj = outer();
obj.inner1();
obj.inner2();
console.log('************************************************');

// console 과 타이머 관련 함수들은 모두 global 객체의 속성이다.
setImmediate(() => console.log('바로 지금1!'));
global.setImmediate(() => console.log('바로 지금2!'));

/**
 * global 객체의 속성이 아닌 것들도 존재한다.
 * 이러한 객체들은 어디에 존재하는 걸까?
 */
console.log('global.module === module :', global.module === module);
console.log('module: ', module);
console.log('global: ', global);

console.dir(__dirname);
console.log(global.__dirname === __dirname);

