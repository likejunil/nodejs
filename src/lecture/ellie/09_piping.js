const fs = require('fs');
const zlib = require('zlib');
const path = require("path");

/**
 *
 */

const dataDir = 'data';
const input = 'en.txt';
const output = 'en.zip';
console.log(`현재 디렉토리=[${__dirname}]`);
const inFile = path.join(__dirname, dataDir, input);
console.log(`원본 파일=[${inFile}]`)
const outFile = path.join(__dirname, dataDir, output);
console.log(`압축 파일=[${outFile}]`)

const rs = fs.createReadStream(inFile);
const gzip = zlib.createGzip();
const ws = fs.createWriteStream(outFile);
const pipe = rs.pipe(gzip).pipe(ws);

pipe.on('finish', () => console.log('작업을 완료했습니다.'))
    .on('error', console.error);
