function add(a, b) {
    return a + b;
}

let add1 = add.bind(null, 1);
console.log(add1(2));

console.log(typeof null);
const f1 = function () {
};
console.log(typeof f1);
const o1 = {a: 1, b: 2};
console.log(typeof o1);
const a1 = [1, 2];
console.log(typeof a1);

console.log(Object.keys(12));