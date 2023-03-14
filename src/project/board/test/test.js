const {tagRegex} = require('../middleware/validator/regex.js');
// const tag = '  #apple #blue #earth ## ###aa   #가나다라마바사아자차카타파하가나다라마바사아자차카타파하가가가가가';
const tag = '';

const f1 = (value) =>
    value.trim().split(' ')
        .map(m => m.trim())
        .filter(m => m.match(tagRegex))
        .map(m => m.slice(1));

console.log(f1(tag));
