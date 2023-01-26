const {increment, getCount, Person, INIT_COUNT: init} = require('./03_1_module_access-property.js');
const log = console.log;

/**
 * require(경로|모듈이름) 의 반환값은 객체다.
 * module.exports 객체 자체를 받을 수도 있고..
 * 특정 속성만을 골라서 받을 수도 있다.
 *
 * 특정 모듈을 가져오면(require..) 해당 모듈이 실행된다.
 */

log('count 초기값 :', init);
log('count 를 2번 증가 실행');
increment();
increment();
log('증가한 count 값 :', getCount());
log();

const person = new Person('효진', 43);
log(person.info);
person.info = ['준일', 48];
log(person.info);
