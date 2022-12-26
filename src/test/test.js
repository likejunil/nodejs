function add(a, b) {
    return a + b;
}

let add1 = add.bind(null, 1);
console.log(add1(2));