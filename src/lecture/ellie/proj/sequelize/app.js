const {sequelize} = require('./repository/associateModel.js');
const proc = require('./test.js');

console.log('\n'
    + '******************\n'
    + '  프로그램 시작\n'
    + '******************\n');

sequelize.sync({force: false, alter: false})
    .then(() => {
        console.log('데이터베이스와의 동기화 작업 완료');
        return proc();
    })
    .catch(err => {
        console.error(err.message);
        console.log('\n'
            + '******************\n'
            + '  프로그램 종료\n'
            + '******************\n');
        process.exit(-1);
    });
