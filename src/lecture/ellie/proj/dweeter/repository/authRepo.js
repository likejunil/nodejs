import {id} from '../util/unique.js';

const ID_LEN = 8;

/**
 * user = {
 *     "id": string(unique),
 *     "username": string(unique),
 *     "password": string(use bcrypt),
 *     "name": string,
 *     "email": string,
 *     "joinAt": Date,
 * }
 */
const data = [];

export async function findByUsername(username) {
    return data.find(m => m.username === username);
}

export async function findById(id) {
    return data.find(m => m.id === id);
}

export async function create(user) {
    const m = {
        id: id(ID_LEN),
        joinAt: Date.now().toString(),
        ...user,
    };
    data.push(m);
    return m;
}

export async function findAll() {
    return data;
}
