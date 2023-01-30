const second = require('./second.js');

console.log('나는 first 다.');
console.log(second.name);
second.name = '효오오오진';

module.exports = {
    name: '준일',
    age: 49,
};
