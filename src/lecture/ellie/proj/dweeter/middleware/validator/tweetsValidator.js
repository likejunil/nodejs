import {body} from "express-validator";
import {handleResult} from "./validator.js";

function text() {
    return body('text').trim()
        .isLength({min: 1, max: 100})
        .withMessage('최소 1자, 최대 100 이내의 글을 작성해 주세요.');
}

export default function validator(path) {
    switch (path) {
        case '/':
            return [
                text(),
                handleResult,
            ];
        
        case '/:id':
            return [
                text(),
                handleResult,
            ];
        
        default:
            console.error(`${path} 에 해당되는 validator 가 존재하지 않습니다.`);
            return [];
    }
}
