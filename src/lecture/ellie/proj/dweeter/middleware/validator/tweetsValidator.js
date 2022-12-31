import {body} from "express-validator";
import {handleResult} from "./validator.js";

function text() {
    return body('text').trim()
        .isLength({min: 1})
        .withMessage('최소 1자 이상의 글을 작성하여 주십시오.');
}

const validator = (method, path) => {
    switch (`${method.toLowerCase()}|${path}`) {
        case 'post|/':
            return [
                text(),
                handleResult,
            ];
        
        case 'put|/:id':
            return [
                text(),
                handleResult,
            ];
        
        default:
            console.error(`${path} 에 해당되는 validator 가 존재하지 않습니다.`);
            return [];
    }
}

export default validator;
