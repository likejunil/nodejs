
// const fruit = document.querySelectorAll('.fruit');
// console.log(fruit);

const fruit = $('.fruit');
console.log(fruit);

const apples = fruit.find('#apples');
console.log(apples);
console.log(apples.val());
console.log(apples.val("found!"));
console.log(apples.val());
apples.append('<h1>사과</h1>');

