import {v4} from 'uuid';

const MAX_LEN = 32;

const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 인자로 길이를 주면, 해당 길이에 해당하는 임의의 문자열을 반환한다.
 * 0 이하 혹은 33 이상의 길이를 인자로 주면, 길이의 값은 32로 변경된다.
 *
 * @param l (1~32)
 * @returns {string}
 */
export const id = (l) => {
    if (l <= 0 || l > MAX_LEN) {
        l = MAX_LEN;
    }
    
    const split = v4().split("-");
    const tmp = split[3] + split[1] + split[2] + split[4] + split[0];
    const start = randInt(0, MAX_LEN - l);
    return tmp.substring(start, start + l);
}
