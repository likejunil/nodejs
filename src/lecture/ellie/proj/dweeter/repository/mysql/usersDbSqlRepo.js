import {db} from './mysqlPool.js';

/**
 * UsersRepository 는 다음 4가지 method 를 구현한다.
 * . create()
 * . findAll()
 * . findById()
 * . findByUsername()
 */

export const create = async (user) => {
    const {username, password, name, email} = user;
    return db
        .execute('INSERT INTO users (username, password, name, email) VALUES (?,?,?,?)',
            [username, password, name, email])
        .then(res => findById(res[0].insertId));
};

export const findAll = async () => {
    return db
        .execute('SELECT * FROM users')
        .then(res => res[0]);
};

export const findById = async (id) => {
    return db
        .execute('SELECT * FROM users WHERE id = ?', [id])
        .then(res => res[0][0]);
};

export const findByUsername = async (username) => {
    return db
        .execute('SELECT * FROM users WHERE username = ?', [username])
        .then(res => res[0][0]);
};
