import {id} from '../util/unique.js';
import * as userRepository from './authRepo.js';

const ID_LEN = 8;

/**
 * tweet = {
 *     "id": string,
 *     "text": string,
 *     createAt: string,
 *     userId: string,
 * }
 */
// 메모리 데이터베이스
let tweets = [];

/**
 * tweet 검색 (all)
 *
 * @returns {Promise<Awaited<*&{name: *, username: *}>[]>}
 */
export async function findAll() {
    return Promise.all(
        tweets.map(async m => {
            const {username, name} = await userRepository.findById(m.userId);
            return {...m, username, name,};
        })
    );
}

/**
 * tweet 검색 (using username)
 *
 * @param username
 * @returns {Promise<(*&{name: *, username: *})[]>}
 */
export async function findByUsername(username) {
    const find = await userRepository.findByUsername(username);
    if (!find) {
        return [];
    }
    
    const {id, name} = find;
    return tweets.filter(m => m.userId === id)
        .map(m => ({...m, username, name}));
}

/**
 * tweet 검색 (using id)
 *
 * @param id
 * @returns {Promise<(T&{name: *, username: *})|null>}
 */
export async function findById(id) {
    const find = tweets.find(m => m.id === id);
    if (!find) {
        return null;
    }
    
    const {username, name} = await userRepository.findById(find.userId);
    return {...find, username, name,};
}

/**
 * tweet 생성
 *
 * @param userId
 * @param text
 * @returns {Promise<{id: string, text, userId, createAt: string}>}
 */
export async function create(userId, text) {
    const one = {
        id: id(ID_LEN),
        createAt: Date(),
        userId,
    };
    
    // 생성
    one.text = text;
    
    tweets = [one, ...tweets];
    return one;
}

/**
 * tweet 갱신
 *
 * @param id
 * @param text
 * @returns {Promise<(T&{name: *, username: *})|null>}
 */
export async function update(userId, text) {
    const find = tweets.find(m => m.userId === userId);
    if (!find) {
        return null;
    }
    
    // 갱신
    find.text = text;
    
    const {username, name} = await userRepository.findById(find.userId);
    return {...find, username, name,};
}

/**
 * tweet 삭제
 *
 * @param id
 * @returns {Promise<void>}
 */
export async function remove(id) {
    tweets = tweets.filter(m => m.id !== id);
}
