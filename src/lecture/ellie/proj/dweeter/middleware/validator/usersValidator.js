import {body, param} from "express-validator";
import {handleResult} from './validator.js';

export default function validator(path) {
    switch (path) {
        case "/:color":
            return [
                param('color').trim()
                    .isIn(['red', 'blue', 'green'])
                    .withMessage('color 는 red, blue, green 중에 하나를 선택해야 합니다.'),
                body('name').trim()
                    .isLength({min: 2, max: 9})
                    .withMessage('이름은 최소 2글자 최대 9글자 이하입니다.'),
                body('age')
                    .isInt()
                    .withMessage('숫자를 입력해 주세요.'),
                body('email')
                    .isEmail()
                    .withMessage('이메일 형식을 확인해 주세요.'),
                body('job.company')
                    .trim()
                    .notEmpty(),
                handleResult
            ];
        
        default:
            console.error(`${path} 에 해당되는 validator 가 존재하지 않습니다.`);
            return [];
    }
}
