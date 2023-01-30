/**
 * x: 전역 x
 * y: 전역 y
 * f1().x: f1 x
 * f1().y: 전역 y
 * f2().x: 전역 x
 * f2().y: 전역 y
 */

var x = '전역 x';
var y = '전역 y';

function f1() {
    var x = 'f1 x';
    console.log('f1().x:', x);
    console.log('f1().y:', y);
    f2();
    
    function f3() {
        console.log('f3().x:', x);
        console.log('f3().y:', y);
    }
    
    f3();
}

function f2() {
    console.log('f2().x:', x);
    console.log('f2().y:', y);
}

console.log('x:', x);
console.log('y:', y);

f1();
