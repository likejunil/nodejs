const fs = require('fs');
const path = require('path');
const log = console.log;
const encoding = 'utf8';

/**
 * 파일에 대한 작업을 할 때 fs 모듈을 사용한다.
 * 3가지 방식이 존재한다.
 */

const dataDir = 'data';
// const file = 'en.txt';
const file = 'ko.txt';
log(`현재 디렉토리=[${__dirname}]`);
const targetFile = path.join(__dirname, dataDir, file);
log(`데이터 파일=[${targetFile}]`)
const stats = fs.statSync(targetFile);
log(`파일 사이즈=[${stats.size}]`);
console.table(stats);
log();


// 1.
// callback 함수를 인자어 주어 non-blocking 으로 진행한다.
// 에러가 발생하면 callback 함수에 error 가 담겨서 반환된다.
// readFile() 에 encoding 인자를 주면 callback 의 data 는 string 타입이 된다.
// 그렇지 않으면 Buffer 타입이 된다.
// callback 은 call stack 이 비워져야 마침내 실행될 수 있다.
const func1 = () => {
    fs.readFile(targetFile, encoding, (error, data) => {
        if (error) {
            console.error(error.message);
            return;
        }
        
        const bytes = Buffer.from(data);
        log(`1. 문자길이=[${data.length}], 문자내용=[10:${data.substring(0, 10)}], ` +
            `바이트길이=[${bytes.length}], 바이트내용=[10:${bytes.toString(encoding, 0, 10)}]`);
    });
    
    log('1. 내보다 먼저 파일을 읽을 수는 없을 것이야..');
};

// 2.
// block 으로 진행한다.
// try-catch 를 통해 에러를 처리해야 한다.
// 파일을 읽는 작업이 완료되어야 다음으로 진행이 가능하기 때문에 병목이 발생한다.
// javascript 는 one-thread 방식이기 때문에 결코 이런 방식을 사용해서는 안된다.
const func2 = () => {
    try {
        const data = fs.readFileSync(targetFile, {encoding, flag: 'r'});
        const bytes = Buffer.from(data);
        log(`2. 문자길이=[${data.length}], 문자내용=[10:${data.substring(0, 10)}], ` +
            `바이트길이=[${bytes.length}], 바이트내용=[10:${bytes.toString(encoding, 0, 10)}]`);
    } catch (error) {
        console.error(error.message);
    }
    
    log('2. 내보다 먼저 파일을 읽을 수는 없을 것이야..');
};

// 3.
// promises 를 사용한다.
const func3 = () => {
    fs.promises
        .readFile(targetFile, encoding)
        .then(data => {
            const bytes = Buffer.from(data);
            log(`3. 문자길이=[${data.length}], 문자내용=[10:${data.substring(0, 10)}], ` +
                `바이트길이=[${bytes.length}], 바이트내용=[10:${bytes.toString(encoding, 0, 10)}]`);
        })
        .catch(error => {
            console.error(error.message);
        });
    
    log('3. 내보다 먼저 파일을 읽을 수는 없을 것이야..');
}

func1();
func2();
func3();
