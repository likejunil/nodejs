const {increment, getCount, Person, count} = require('./03_1_counter.js');

/**
 * require(경로|모듈이름) 의 반환값은 객체다.
 * module.exports 객체 자체를 받을 수도 있고..
 * 특정 속성만을 골라서 받을 수도 있다.
 *
 * 특정 모듈을 가져오면(require..) 해당 모듈이 실행된다.
 */

console.log(count);
increment();
increment();
console.log(getCount());

const person = new Person('효진', 43);
console.log(person.info);
person.info = 44;
console.log(person.info);
