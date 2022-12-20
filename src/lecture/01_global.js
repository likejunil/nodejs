/**
 * global 은 전역 객체이다 .
 * 프로그램이 실행되면 가장 먼저 생성되는 객체이다.
 * 어떤 모듈이든 모두 접근할 수 있는 공통 객체이다.
 * global 이름은 생략이 가능하다.
 *
 * var 선언 변수는 global 객체의 속성이 된다.
 * let, const 선언 변수는 global 객체의 속성이 아니다.
 * 변수명만 사용할 경우 암묵적으로 var 가 선언된다.
 *
 * console 객체 역시 global 객체의 속성이다.
 * setTimer, setInterval, setImmediate, clear* 모두 global 객체의 속성이다.
 */

// global 객체에 임의이 속성을 할당할 수 있다.
// global 객체는 어디서나 접근이 가능하고, global 이름을 생략할 수 있다.
global.hello = () => console.log('안녕하세요~!');
global.hello();
hello();
console.log();

// 모듈 내의 전역에서 선언한 var 변수는 global 객체의 속성이 된다.
// 변수명만 사용할 경우 암묵적으로 var 가 사용된다.
animal = 'cat';
console.log(animal);
console.log(global.animal);
console.log();

// const, let 의 경우는 global 객체의 속성이 되지 않는다.
const color = 'black';
let planet = 'earth';
console.log(color);
console.log(global.color);
console.log(planet);
console.log(global.planet);
console.log();

// console 과 타이머 관련 함수들은 모두 global 객체의 속성이다.
setImmediate(() => console.log('바로 지금1!'));
global.setImmediate(() => console.log('바로 지금2!'));


/**
 * global 객체의 속성이 아닌 것들도 존재한다.
 * 이러한 객체들은 어디에 존재하는 걸까?
 */
console.dir(__dirname);
console.log(global.__dirname === __dirname);

console.dir(module);
console.log(global.module === module);
