import {body} from 'express-validator';
import {handleResult} from "./validator.js";

const username = () => {
    return body('username').trim()
        .isLength({min: 1, max: 8})
        .withMessage('유저이름은 최소 1자 최대 8자입니다.');
};

const password = () => {
    return body('password').trim()
        .isLength({min: 5})
        .withMessage('패스워드는 최소 5자입니다.');
};

const email = () => {
    return body('email').trim()
        .isEmail()
        .withMessage('이메일 형식을 확인하여 주십시오.');
}

const name = () => {
    return body('name').trim()
        .isLength({min: 1, max: 10})
        .withMessage('이름은 최소 1자 최대 10자입니다.');
}

export default function validator(path) {
    switch (path) {
        case "/signup":
            return [
                username(),
                password(),
                email(),
                name(),
                handleResult,
            ];
        
        case "/login":
            return [
                username(),
                password(),
                handleResult,
            ];
        
        default:
            console.error(`${path} 에 해당되는 validator 가 존재하지 않습니다.`);
            return [];
    }
}
