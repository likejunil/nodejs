const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./file2.txt');
const gzip = zlib.createGzip();
const writeStream = fs.createWriteStream('./file3.zip');
const pipe = readStream.pipe(gzip).pipe(writeStream);
pipe.on('finish', () => {
    console.log('작업을 완료했습니다.');
}).on('error', console.error);
