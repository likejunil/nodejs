/**
 * browser 에서의 this 와 nodejs 에서의 this 는 차이가 있다.
 * nodejs 에서 사용하는 this 는 크게 4가지 경우가 있다.
 */

// 1.
console.log('1. 모듈 자체를 가리키는 경우 (모듈)');
console.log('this === global :', this === global);
console.log('this === module.exports : ', this === module.exports);
console.log();

// 2-1.
(function () {
    console.log('2. global 전역 객체를 가리키는 경우 (일반 함수)');
    console.log('this === global :', this === global);
    console.log();
})();

// 2-2.
function func() {
    const arrow = () => {
        
    }
}


// 3.
(() => {
    module.exports.color = 'red';
    console.log('3. 모듈 자체를 가리키는 경우 (화살표 함수)');
    console.log('this === global :', this === global);
    console.log('this === module.exports : ', this === module.exports);
    console.log(this);
    console.log();
})();

// 4.
class Test {
    constructor() {
        this.color = 'green';
    }
    
    test() {
        console.log('4. 객체 자신을 가리키는 경우 (메서드의 경우)');
        console.log('this :', this);
        console.log();
    }
}

const t = new Test();
t.test();
