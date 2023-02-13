const {getCollection} = require('./repository/initMongodb.js');
const log = console.log;

const a__입력_조회_갱신 = async () => {
    const users = getCollection('users');
    
    let ret;
    /* 입력 */
    /* ret = {acknowledged, insertedId: ObjectId} */
    ret = await users.insertOne({name: '준일님', age: 49, married: true,});
    
    /* ret = {acknowledged, insertedCount, insertedIds: Object} */
    ret = await users.insertMany([
        {name: '준일', age: 49, married: true, feel: 'happy',},
        {name: '효진', age: 44, married: true, feel: 'amazed'},
        {name: '이강', age: 12, married: false, feel: 'angry'},
    ]);
    
    /* 검색 조회 */
    /* find() 는 쿼리를 발생시키지 않는다. */
    /* FindCursor 을 반환한다. */
    const cursor = users.find({age: {$gt: 20}}).limit(1);
    await cursor.forEach(log);
    
    /* 갱신 */
    /* {조건}, {액션} */
    /* 단건 갱신 */
    /* ret = {acknowledged, modifiedCount, upsertedId, upsertedCount, matchedCount} */
    ret = await users.updateOne(
        {name: '이강'},
        {$set: {feel: 'sad'}}
    );
    
    /* 복수 갱신 */
    /* ret = {acknowledged, modifiedCount, upsertedId, upsertedCount, matchedCount} */
    ret = await users.updateMany({
        $and: [
            {name: {$in: ['준일', '효진']}},
            {age: {$lt: 50}},
            {married: true},
        ],
    }, {
        $set: {feel: 'normal'},
        $inc: {age: 1},
    });
};

const b__삭제하기 = async () => {
    const users = getCollection('users');
    
    /* find() 는 쿼리를 발생시키지 않는다. */
    /* FindCursor 을 반환한다. */
    const cursor = users.find().sort({age: -1}).skip(1).limit(10);
    await cursor.forEach(m => log(`name:|${m.name}|, age:|${m.age}|, married:|${m.married}|, feel:|${m.feel}|`));
    
    /* 단건 삭제 */
    /* {조건}, {액션} */
    /* ret = {acknowledged, deletedCount} */
    let ret;
    ret = await users.deleteOne({name: '이강'});
    
    /* 다수 삭제 */
    /* {조건}, {액션} */
    /* ret = {acknowledged, deletedCount} */
    ret = await users.deleteMany({married: true});
};

const c__트랜잭션_사용 = () => {
    /* https://www.mongodb.com/docs/manual/core/transactions/ */
    
};

const proc = async () => {
    await a__입력_조회_갱신();
    await b__삭제하기();
    await c__트랜잭션_사용();
};

module.exports = proc;
