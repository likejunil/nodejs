const {Sequelize} = require('sequelize');
const config = require('../config/config.js');

/* 데이터베이스 접속 정보를 셋팅한 sequelize 객체 생성 */
/* 데이터베이스 연결 테스트 */
const sequelize = new Sequelize(config.sequelize);
sequelize.authenticate()
    .then(() => console.log('데이터베이스 접속 성공'))
    .catch(err => {
        console.error(err);
        process.exit(-1);
    });

/**
 * Member(N) : Group(M)
 * Member(N) : Family(1)
 * Member(1) : Profile(1)
 * Member(1) : Board(N)
 * Member(1) : Comment(N)
 * Member(1) : File(N)
 *
 * Board(N) : Member(1)
 * Board(1) : Comment(N)
 * Board(1) : File(N)
 */

module.exports = sequelize;
