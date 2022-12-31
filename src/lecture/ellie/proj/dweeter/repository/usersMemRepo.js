import {id} from '../util/unique.js';

/**
 * UsersRepository 는 다음 4가지 method 를 구현한다.
 * . create()
 * . findAll()
 * . findById()
 * . findByUsername()
 */


/**
 * user = {
 *     "id": string(unique),
 *     "username": string(unique),
 *     "password": string(use bcrypt),
 *     "name": string,
 *     "email": string,
 *     "createAt": Date,
 * }
 */
const users = [];
const ID_LEN = 8;

/**
 * 사용자 생성
 * . id, username 은 유일해야 한다. (unique)
 * . id, username, password, name, email, createAt 모두 값이 존재해야 한다. (not null)
 * . username 중복 여부 확인은 controller 에서 진행한다.
 */
export async function create(user) {
    const {password, username, name, email} = user;
    const m = {
        id: id(ID_LEN),
        username,
        password,
        name,
        email,
        createAt: new Date(),
    };
    users.push(m);
    return m;
}

/**
 * 해당 객체를 반환한다.
 * 대상 사용자가 없을 경우 undefined 를 반환한다.
 */
export async function findByUsername(username) {
    return users.find(m => m.username === username);
}

/**
 * 해당 객체를 반환한다.
 * 대상 사용자가 없을 경우 undefined 를 반환한다.
 */
export async function findById(id) {
    return users.find(m => m.id === id);
}

/**
 * 모든 사용자를 담은 배열을 반환한다.
 */
export async function findAll() {
    return users;
}
