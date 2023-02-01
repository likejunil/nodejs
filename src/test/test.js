const path = require('path');
const j1 = require('./j1lib.js');
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
log(`${d.getFullYear()}-${j1.fill(d.getMonth() + 1, 2)}-${j1.fill(d.getDate(), 2)}`)
