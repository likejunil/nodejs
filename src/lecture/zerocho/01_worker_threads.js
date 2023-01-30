const process = require('process');
const os = require('os');
const {isMainThread, Worker, parentPort, workerData} = require('worker_threads');
const log = console.log;

const f1 = () => {
    if (isMainThread) {
        log('부모 시작');
        log('core의 개수:', os.cpus().length);
        log('현재 디렉토리:', process.cwd());
        const filename = process.mainModule.filename; // __filename;
        
        // 자식에게 실행을 맡길 모듈 지정
        const worker = new Worker(filename, {workerData: {start: 1}});
        
        // 자식에게 작업 지시
        worker.postMessage("ping");
        
        // 자식으로부터 결과 보고 받음
        worker.on('message', (value) => log('자식으로부터 메시지 도착:', value));
        
        // 자식의 종료 확인
        worker.on('exit', () => log('자식 종료'));
        
    } else {
        log('자식 시작');
        const data = workerData;
        log('자식이 받은 데이터:', data);
        
        parentPort.on('message', (value) => {
            // 부모로부터 지시를 받음
            log('부모로부터 메시지 도착:', value);
            
            // 지시에 따른 작업 진행
            const msg = `pong-${data.start}`;
            
            // 부모에게 작업 결과 전달
            parentPort.postMessage(msg);
            
            // 종료
            parentPort.close();
        });
    }
}

f1();