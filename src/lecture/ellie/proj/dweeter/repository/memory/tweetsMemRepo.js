import {id} from '../../util/unique.js';
import * as userRepository from './usersMemRepo.js';

/**
 * . create()
 * . update()
 * . remove()
 * . findAll()
 * . findById()
 * . findByUsername()
 */

/**
 * tweet = {
 *     "id": string,
 *     "text": string,
 *     "createdAt": string,
 *     "userId": string,
 * }
 */

let tweets = [];
const ID_LEN = 8;

/**
 * tweet 생성
 */
export async function create(userId, body) {
    // 생성할 때 필요한 데이터를 추출
    const {text} = body;
    
    const tweet = {
        id: id(ID_LEN),
        text,
        createdAt: new Date(),
        userId,
    };
    
    // 기존의 것을 변경하지 않고 새롭게 생성하는 방식
    tweets = [...tweets, tweet];
    
    return tweet;
}

/**
 * tweet 갱신
 */
export async function update(tweet) {
    // 갱신하려는 데이터가 있는지 확인
    const {id} = tweet;
    const find = tweets.find(m => m.id === id);
    if (!find) {
        console.error(`갱신하려는 데이터가 존재하지 않음, id = |${id}|`);
        return null;
    }
    
    // 갱신
    tweets = tweets.map(m => (m.id === id) ? tweet : m);
    
    // 반환 데이터 조회
    const {username, name} = await userRepository.findById(find.userId);
    
    return {...find, username, name,};
}

/**
 * tweet 삭제
 */
export async function remove(id) {
    // 삭제
    tweets = tweets.filter(m => m.id !== id);
}

/**
 * tweet 검색 (all)
 */
export async function findAll() {
    // 반환 데이터에는 사용자의 아이디와 이름이 포함되어야 함
    return Promise.all(
        tweets.map(async m => {
            const {username, name} = await userRepository.findById(m.userId);
            return {...m, username, name};
        })
    );
}

/**
 * tweet 검색 (using username)
 */
export async function findByUsername(username) {
    // 특정 사용자의 데이터가 존재하지 않는 것은 에러가 아님
    const find = await userRepository.findByUsername(username);
    if (!find) {
        return [];
    }
    
    const {id, name} = find;
    return tweets
        .filter(m => m.userId === id)
        .map(m => ({...m, username, name}));
}

/**
 * tweet 검색 (using id)
 */
export async function findById(id) {
    // 특정 아이디를 지정한 데이터가 존재하지 않는 것은 에러
    const find = tweets.find(m => m.id === id);
    if (!find) {
        console.error(`해당 데이터가 존재하지 않음, id = |${id}|`);
        return null;
    }
    
    // 반환 데이터 조회
    const {username, name} = await userRepository.findById(find.userId);
    
    return {...find, username, name,};
}
