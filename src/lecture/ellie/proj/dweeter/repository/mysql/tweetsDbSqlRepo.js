import {db} from './initMysql.js';

/**
 * . create()
 * . update()
 * . remove()
 * . findAll()
 * . findById()
 * . findByUsername()
 */

export const create = async (userId, body) => {
    const {text} = body;
    return db
        .execute('INSERT INTO tweets (text, userId) VALUES (?,?)', [text, userId])
        .then(res => findById(res[0].insertId));
}

export const update = async (save) => {
    const {id, text} = save;
    return db
        .execute('UPDATE tweets SET text = ? WHERE id = ?', [text, id])
        .then(res => findById(id));
}

export const remove = async (id) => {
    return db
        .execute('DELETE FROM tweets WHERE id = ?', [id])
        .then(res => console.log(`삭제된 데이터의 개수 = |${res.affectedRows}|`));
}

const SELECT_FROM = ''
    + 'SELECT t.id '
    + '     , t.text '
    + '     , t.createdAt '
    + '     , t.userId '
    + '     , u.username '
    + '     , u.name '
    + '  FROM tweets t JOIN users u '
    + '    ON t.userId = u.id ';

export const findAll = async () => {
    return db
        .execute(`${SELECT_FROM}`)
        .then(res => res[0]);
}

export const findById = async (id) => {
    return db
        .execute(`${SELECT_FROM} WHERE t.id = ?`, [id])
        .then(res => res[0][0]);
}

export const findByUsername = async (username) => {
    return db
        .execute(`${SELECT_FROM} WHERE u.username = ?`, [username])
        .then(res => res[0]);
}
