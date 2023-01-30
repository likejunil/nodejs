/**
 * 1.
 * global 은 전역 객체이다.
 * 프로그램이 실행되면 가장 먼저 생성되는 객체이다.
 * 어떤 모듈이든 모두 접근할 수 있는 공통 객체이다.
 * global 객체의 속성에 접근할 때 global 이름은 생략이 가능하다.
 *
 * 대부분의 built-in 객체들이 global 전역 객체의 속성이 된다.
 * (Object, Boolean, Number, String, Function, Array, Symbol, ..)
 * nodejs 의 경우 nodejs 가 제공하는 객체들이 global 의 속성으로 등록된다.
 * (browser 의 경우 BOM, DOM 등의 객체도 window 의 속성으로 등록된다.)
 * console 객체 역시 global 객체의 속성이다.
 * setTimer, setInterval, setImmediate, clear* 모두 global 객체의 속성이다.
 *
 * 2.
 * 전역에서 선언한 var 변수는 global 객체의 속성이 된다.
 * 변수명만 사용할 경우 암묵적으로 var 가 선언된다.
 * let, const 선언 변수는 global 객체의 속성이 아니다.
 * 전역에서 선언한 일반 함수는 global 의 속성이 아니다.
 * (browser 에서는 전역에서 선언한 일반 함수가 window 객체의 속성이 된다.)
 * 하지만 일반 함수 내의 this 는 global(window) 을 가리킨다.
 *
 * << this >>
 * 일반적으로 this === module.exports === exports 이다.
 * 하지만 일반 함수의 내부에서 this 는 global 이다.
 * strict mode 에서 일반 함수 내부의 this 는 undefined 이다.
 * 화살표 함수는 자신이 선언되는 곳에서의 this 를 물려 받는다.
 */
const log = console.log;

// global 객체에 임의로 속성을 할당할 수 있다.
// global 객체는 어디서나 접근이 가능하고, global 이름을 생략할 수 있다.
log('************************************************');
log(' << this: 누가 나를 실행시켰는가? >>');
log('************************************************');

//1.
log('모듈 전역에서 this === module.exports :', this === module.exports);
log('=> 1. 일반적으로 nodejs 에서 this 는 module.exports 이다.')
log();

//2.
(function () {
    log('일반 함수 내에서(no strict) this === global :', this === global);
})();

(function () {
    'use strict';
    log('일반 함수 내에서(strict) this === undefined :', this === undefined);
})();
log('=> 2. 일반 함수내에서 this 는 global 이다. strict mode 인 경우에는 undefined 가 된다.');
log();

// 3.
global.hi = function () {
    log('글로벌 속성의 일반 함수 내에서(no strict) this === global :', this === global);
}
global.hi();

global.hi_strict = function () {
    'use strict';
    log('글로벌 속성의 일반 함수 내에서(strict) this === global :', this === global);
}
global.hi_strict();
log('=> 3. global 객체의 속성인 함수는 항상 global 을 this 로 갖는다.');
log();

// 4.
const bye = () => {
    log('전역 화살표 함수 내에서 this === module.exports :', this === module.exports);
};
bye();

global.hello = () => {
    log('글로벌 속성의 화살표 함수 내에서 this === module.exports :', this === module.exports);
}
hello();

(function () {
    const _this = this;
    log('일반 함수의 _this(this) === global :', _this === global);
    const f = () => {
        log('일반 함수 내부에서의 화살표 함수에서 this === _this:', this === _this);
    };
    f();
})();
log('=> 4. 화살표 함수는 this 를 갖고 있지 않다. 따라서 scope 를 따라가며 this 를 찾는다.');
log();


log('************************************************');
log(' << var 는 사용하지 않는다. >>');
log('************************************************');
log('>> 1. 암묵적 선언이 허용된다.')
log('>> 2. 모듈 내의 전역에서 선언한 var 변수는 global 객체의 속성이 된다.');
log('>> 3. 중복 선언을 허용한다. 의도치 않게 이전의 값을 덮어쓸 수 있다.');
log('>> 4. 함수 스코프만 적용되고 블럭 스코프를 무시한다.');

// 모듈 내의 전역에서 선언한 var 변수는 global 객체의 속성이 된다.
// 변수명만 사용할 경우 암묵적으로 var 가 사용된다.
animal = 'cat';
log('animal :', animal);
log('animal === global.animal :', animal === global.animal);
log();

// const, let 의 경우는 global 객체의 속성이 되지 않는다.
const color = 'black';
let planet = 'earth';
log('const color :', color);
log('global.color !== color :', global.color !== color);
log('let planet :', planet);
log('global.planet !== planet :', global.planet !== planet);
log();

// 브라우저 환경에서 전역에서의 일반 함수는 window 객체의 속성이 된다.
// 하지만 nodejs 에서 전역의 일반 함수는 global 의 속성이 되지 않는다.
// 아마도 declarative environment record 에 const, let 과 함께 저장되는 것으로 추측된다.

// 일반 함수에서 this 는 항상 global 이다. (not strict mode)
// strict mode 에서 일반 함수의 this 는 항상 undefined 이다.

// 화살표 함수는 항상 자신이 선언되는 위치에서의 this 를 따른다.
// 일반 함수의 this 는 동적으로 결정되지만,
// 화살표 함수의 this 는 선언할 때 정적으로 결정된다.
