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
const users = [];

/**
 * 사용자가 식별 가능한 unique 속성인 username 으로 사용자 검색
 *
 * @param username
 * @returns {Promise<*>}
 */
export async function findByUsername(username) {
    return users.find(m => m.username === username);
}

/**
 * DB 가 관리하기 위한 unique 속성인 id 으로 사용자 검색
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function findById(id) {
    return users.find(m => m.id === id);
}

/**
 * 사용자 생성
 *
 * @param user
 * @returns {Promise<{password, joinAt: string, name, id: string, email, username}>}
 */
export async function create(user) {
    const {password, username, name, email} = user;
    const m = {
        id: id(ID_LEN),
        username,
        password,
        name,
        email,
        joinAt: Date(),
    };
    users.push(m);
    return m;
}

/**
 * 모든 사용자 검색
 *
 * @returns {Promise<*[]>}
 */
export async function findAll() {
    return users;
}
