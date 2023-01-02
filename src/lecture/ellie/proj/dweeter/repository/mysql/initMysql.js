import mysql from 'mysql2';
import config from '../../configure/config.js';

const {mysql: d} = config;
const pool = mysql.createPool({
    host: d.host,
    port: d.port,
    user: d.user,
    password: d.pass,
    database: d.database,
});

export const db = pool.promise();
