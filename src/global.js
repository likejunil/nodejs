/**
 * global 은 전역 객체이다.
 * 어떤 모듈이든 모두 접근할 수 있는 공통 객체이다.
 * global 이름은 생략이 가능하다.
 *
 * console 객체 역시 global 객체의 속성이다.
 * setTimer, setInterval, setImmediate, clear* 모두 global 객체의 속성이다.
 */
global.hello = () => console.log('안녕하세요~!');
global.hello();
hello();

/**
 * 도대체 __dirname 변수는 어느 객체에 있는 것인가?
 */
console.log(__dirname);
console.log(global.__dirname);
console.dir(global);

setImmediate(() => console.log('바로 지금1!'));
global.setImmediate(() => console.log('바로 지금2!'));

