const INIT_VALUE = 0;

let count = INIT_VALUE;

function increment() {
    count += 1;
}

function getCount() {
    return count;
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    get info() {
        return `이름은 ${this.name}, 나이는 ${this.age}입니다.`;
    }
    
    set info(age) {
        this.age = age;
    }
}

if (module.exports === exports) {
    console.log('module.exports === exports :', module.exports === exports);
}

module.exports.color = 'blue';
exports = {color: 'green',};
console.log(module.exports);

/**
 * module.exports 는 객체다.
 * module.exports 는 처음에 {}(빈 객체)으로 초기화된다.
 * module.exports 에 외부에 노출하고 싶은 속성을 담는다.
 * module.exports 를 활용하여 원하는 것만 노출시킬 수 있다.
 * 외부에서 해당 모듈을 require() 하면 module.exports 객체를 사용할 수 있게 된다.
 *
 * exports 는 module.exports 를 가리키는 객체다.
 * exports 에 다른 객체를 할당하면 module.exports !== exports 가 된다.
 */
module.exports = {INIT_VALUE, increment, getCount, Person};
