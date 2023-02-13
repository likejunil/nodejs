const {mongoConn} = require('./repository/initMongodb.js');
const proc = require('./test.js');
const log = console.log;

mongoConn()
    .then(() => {
        log("\n"
            + "*********************************\n"
            + "  몽고 접속 성공, 프로그램 시작\n"
            + "*********************************\n"
        );
        return proc();
        
    })
    .catch(err => {
        console.error(err.message);
        log("\n"
            + "*********************************\n"
            + "  몽고 접속 실패, 프로그램 종료\n"
            + "*********************************\n"
        );
        process.exit(-1);
    });
