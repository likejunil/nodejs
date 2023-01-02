import {MongoClient} from 'mongodb';
import config from '../../configure/config.js';

const {user, pass, host, database} = config.mongo;
const uri = `mongodb+srv://${user}:${pass}@${host}/?retryWrites=true&w=majority`;

let db;
export const connectMongo = async () => {
    return MongoClient
        .connect(uri)
        .then(client => {
            db = client.db(database);
        });
};

export const getCollection = (collection) => {
    return db ? db.collection(collection) : null;
};
