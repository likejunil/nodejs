/**
 * require() 의 반환값은 객체다.
 * 객체이므로 객체의 속성 순서는 상관없다.
 */
const {increment, getCount, INIT_VALUE, Person} = require('./counter.js');

increment();
increment();
const count = getCount();
console.log(INIT_VALUE, count);

const person = new Person('효진', 43);
console.log(person.info);
person.info = 44;
console.log(person.info);
