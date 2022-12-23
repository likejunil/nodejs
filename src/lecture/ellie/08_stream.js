const fs = require('fs');
const path = require("path");

/**
 * Stream 은 event 를 등록하여 사용한다.
 */

const func = () => {
    const dataDir = 'data';
    const file = 'en.txt';
    console.log(`현재 디렉토리=[${__dirname}]`);
    const inFile = path.join(__dirname, dataDir, file);
    console.log(`데이터 파일=[${inFile}]`)
    const options = {
        // 기본적으로 64(KB) 가 주어진다.
        highWaterMark: 1024 * 1024,
        // encoding 을 주면 chunk 를 String 으로 받는다.
        // 기본값은 Buffer 이다.
        encoding: 'utf8',
    };
    
    fs.createReadStream(inFile, options)
        .on('error', error => {
            console.error(`에러가 발생했습니다. => [${error}]`);
        })
        .once('open', fd => {
            console.log(`[${fd}] 으로 스트림을 열었습니다.`);
        })
        .on('ready', () => {
            console.log(`준비가 되었습니다.`);
        })
        .once('end', () => {
            console.log(`데이터를 모두 읽었습니다.`);
        })
        .on('data', chunk => {
            console.log(`${(chunk.length / 1024).toFixed(3)}KB 수신`);
        })
        .once('close', () => {
            console.log(`스트림을 닫았습니다.`);
        });
}

func();
