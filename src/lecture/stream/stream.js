const fs = require('fs');

const func1 = () => {
    fs.stat('./file.txt', (_, data) => {
        console.table(data)
        console.log(`파일의 크기는 ` +
            `${((data.size / 1024).toFixed(3))}KB 입니다.`);
        
        const before = process.memoryUsage();
        console.table(before);
        console.log(`파일을 열기 전 메모리 사용량(rss)은 ` +
            `${(before.rss / 1024).toFixed(3)}KB 입니다.`);
        
        /**
         * 파일을 한꺼번에 모두 다 읽기 때문에 메모리 사용이 효율적이지 못하다.
         */
        fs.readFile('./file.txt', (_, data) => {
            fs.writeFile('./file2.txt', data, () => {
                const after = process.memoryUsage();
                console.table(after);
                console.log(`파일을 복사한 후 메모리 사용량(rss)은 ` +
                    `${(after.rss / 1024).toFixed(3)}KB 입니다.`);
                console.log(`총 ${((after.rss - before.rss) / 1024).toFixed(3)}KB 의 ` +
                    `메모리를 사용하였습니다.`);
            });
        });
    });
}

const func2 = () => {
    /**
     * readStream 은 event 를 등록할 수 있다.
     * : close, data, end, error, open, pause, readable, ready, resume, ...
     */
    fs.createReadStream('./file.txt', {
        // 기본적으로 64(KB) 가 주어진다.
        highWaterMark: 1024 * 1024,
        // encoding 을 주면 chunk 를 String 으로 받는다.
        // 기본값은 Buffer 이다.
        encoding: 'utf-8',
    }).on('error', error => {
        console.error(`에러가 발생했습니다. => [${error}]`);
    }).once('open', fd => {
        console.log(`[${fd}] 으로 스트림을 열었습니다.`);
    }).on('ready', () => {
        console.log(`준비가 되었습니다.`);
    }).once('end', () => {
        console.log(`데이터를 모두 읽었습니다.`);
    }).on('data', chunk => {
        console.log(`${(chunk.length / 1024).toFixed(3)}KB 수신`);
    }).once('close', () => {
        console.log(`스트림을 닫았습니다.`);
    });
}

func2();
