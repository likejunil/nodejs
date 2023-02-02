const path = require('path');
const log = console.log;

const filename = '/Users/june1/Downloads/ttt.txt';
log(filename);
const extname = path.extname(filename);
log(extname);
const base1 = path.basename(filename);
log(base1);
const base2 = path.basename(filename, extname);
log(base2);

const d = new Date(Date.now());
