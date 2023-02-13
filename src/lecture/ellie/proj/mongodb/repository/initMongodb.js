const {MongoClient} = require('mongodb');
const {mongodb} = require('../config/config.js');

const {host, user, pass, port, database} = mongodb;

/* 패스워드에 특수문자가 포함될 경우 에러가 발생한다. */
/* local docker mongodb 에 접속할 때 srv 를 추가하면 에러 발생 */
/* const uri = `mongodb+srv://${user}:${pass}@${host}?retryWrites=true&writeConcern=majority`; */
const uri = `mongodb://${user}:${pass}@${host}:${port}/?retryWrites=true&writeConcern=majority`;
const client = new MongoClient(uri);

let db;
const mongoConn = async () => {
    await client.connect();
    db = client.db(database);
}
const getCollection = (name) => db && db.collection(name);

module.exports = {
    mongoConn,
    getCollection,
};
