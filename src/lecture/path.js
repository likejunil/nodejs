const path = require('src/lecture/path');

/**
 * __dirname, __filename 속성은..
 * 어떤 객체의 속성일까?
 */
console.log(__dirname);
console.log(__filename);

console.log(path.sep);
console.log(path.delimiter);

console.log(path.basename(__dirname));
console.log(path.basename(__filename));
console.log(path.basename(__filename, '.js'));
console.log(path.extname(__filename));

const parse = path.parse(__filename);
console.log(parse);
console.log(path.format(parse));

// path 의 경로를 올바르게 고쳐준다.
console.log(path.normalize(__filename));
// path 를 연결하여 완성한다.
console.log(path.join(parse.dir, parse.base));
