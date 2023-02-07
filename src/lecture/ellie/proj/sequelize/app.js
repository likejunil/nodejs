const sequelize = require('./repository/initSequelize.js');
const Member = require('./repository/model/member.js');
const Profile = require('./repository/model/profile.js');
const proc = require('./test/test.js');

console.log(''
    + '******************\n'
    + '  프로그램 시작\n'
    + '******************\n');

/* Member(1) : (1)Profile */
/* onDelete, onUpdate: 'RESTRICT', 'CASCADE', 'NO ACTION', 'SET DEFAULT', 'SET NULL' */
Member.hasOne(Profile, {foreignKey: 'userId', sourceKey: 'id'});
Profile.belongsTo(Member, {foreignKey: 'userId', targetKey: 'id'});

/* */


sequelize.sync({force: true})
    .then(() => {
        console.log('데이터베이스와의 동기화 작업 완료');
        proc();
    })
    .catch(err => {
        console.error(err);
        process.exit(-1);
    });

