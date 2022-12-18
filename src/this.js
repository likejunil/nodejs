// nodejs 에서 사용하는 this 의 의미
console.log('1. 모듈 자체를 가리키는 경우 (모듈)');
console.log('this === global :', this === global);
console.log('this === module.exports : ', this === module.exports);

(function () {
    console.log('2. global 전역 객체를 가리키는 경우 (일반 함수)');
    console.log('this === global :', this === global);
})();

(() => {
    console.log('3. 빈 객체를 가리키는 경우 (화살표 함수)');
    console.log('this === global :', this === global);
    console.log('this === module.exports : ', this === module.exports);
    console.log(this);
})();

class Test {
    test() {
        console.log('4. 클래스를 가리키는 경우 (메서드의 경우)');
        console.log('this :', this);
    }
}

const t = new Test();
t.test();
