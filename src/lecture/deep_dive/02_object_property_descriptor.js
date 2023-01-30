/**
 * Object.hasOwnProperty.bind()
 * Object.getOwnPropertyDescriptors()
 * Object.getOwnPropertyDescriptor()
 * Object.defineProperties()
 * Object.defineProperty()
 *
 * Object.entires()
 * Object.keys();
 * Object.values();
 *
 * Object.getPrototypeOf()
 * Object.setPrototypeOf()
 *
 * Object.isFronzen()
 * Object.freeze()
 * Object.isSealed()
 * Object.seal()
 * Object.isExtensible()
 * Objedt.preventExtension()
 *
 * Object.assign()
 * Object.create()
 */

const log = console.log;
const table = console.table;

// --------------------------------------------------------
// 모든 객체는 Object.prototype 의 속성을 상속 받는다.
// --------------------------------------------------------
Object.prototype.ok = () => log('ok');

const o1 = {color: 'red'};
const f1 = (a, b) => a + b;
const a1 = [1, 2];
log('o1:', o1);
log('f1:', f1);
log('a1:', a1);
log();

// --------------------------------------------------------
// 속성의 enumerable 값이 false 이면 for in 에 출력되지 않는다.
// for in 혹은 in 에는 상속받는 모든 props 가 적용된다.
// --------------------------------------------------------
log('Object.prototype === o1.__proto__:', Object.prototype === o1.__proto__);
for (const m in o1) log(`o1 prop: |${m}|, own: |${Object.hasOwnProperty.bind(o1)(m)}|`);
log('Function.prototype === f1.__proto__:', Function.prototype === f1.__proto__);
for (const m in f1) log(`f1 prop: |${m}|, own: |${Object.hasOwnProperty.bind(f1)(m)}|`);
log('Array.prototype === a1.__proto__:', Array.prototype === a1.__proto__);
for (const m in a1) log(`a1 prop: |${m}|, own: |${Object.hasOwnProperty.bind(a1)(m)}|`);
log();

// --------------------------------------------------------
// entries, keys, values 는 모두 hasOwnProperty 를 대상으로 한다.
// --------------------------------------------------------
for (const m of Object.keys(o1)) log('o1 keys:', m);
for (const m of Object.values(o1)) log('o1 values:', m);
for (const m of Object.entries(o1)) log('o1 entries:', m);
log('getOwnPropertyDescriptors(o1):', Object.getOwnPropertyDescriptors(o1));

for (const m of Object.keys(f1)) log('f1 keys:', m);
for (const m of Object.values(f1)) log('f1 values:', m);
for (const m of Object.entries(f1)) log('f1 entries:', m);
log('getOwnPropertyDescriptors(f1):', Object.getOwnPropertyDescriptors(f1));

for (const m of Object.keys(a1)) log('a1 keys:', m);
for (const m of Object.values(a1)) log('a1 values:', m);
for (const m of Object.entries(a1)) log('a1 entries:', m);
log('getOwnPropertyDescriptors(a1):', Object.getOwnPropertyDescriptors(a1));
log();

// --------------------------------------------------------
// property 의 속성을 정의한다.
// --------------------------------------------------------
const o2 = Object.assign({}, o1);
Object.defineProperty(o2, 'color', {
    value: 'red',
    writable: false,        // 값 갱신을 막는다.
    enumerable: false,      // 열거 대상에서 제외시킨다.
    configurable: false,    // 삭제를 막고 속성 재설정을 막는다.
});
// 값 갱신을 막는다.
o2.color = 'black';
log(`o2.color: |${o2.color}|`)
// 열거 대상에서 제외시킨다.
for (const m in o2) {
    log(`o2 prop: |${m}|, own: |${o2.hasOwnProperty(m)}|`);
}
// 삭제를 막고 속성 재설정을 막는다.
delete o2.color;
log(`o2.color: |${o2.color}|`)

// --------------------------------------------------------
// 객체의 변경 가능성 유무를 조정한다.
// --------------------------------------------------------
const obj = {
    animal: 'cat',
    age: 10,
    alive: true,
};

table(Object.getOwnPropertyDescriptors(obj));

// 오직 추가만 불가능
log('isExtensible:', Object.isExtensible(obj));
Object.preventExtensions(obj);
log('after preventExtensions()');
log('isExtensible:', Object.isExtensible(obj));
table(Object.getOwnPropertyDescriptors(obj));

// 오직 읽고 쓰기만 가능, configurable: false
log('isSealed:', Object.isSealed(obj));
Object.seal(obj);
log('after seal()');
log('isSealed:', Object.isSealed(obj));
table(Object.getOwnPropertyDescriptors(obj));

// 오직 읽기만 가능, writable: false, configurable: false
log('isFrozen:', Object.isFrozen(obj));
Object.freeze(obj);
log('after freeze()');
log('isFrozen:', Object.isFrozen(obj));
table(Object.getOwnPropertyDescriptors(obj));
