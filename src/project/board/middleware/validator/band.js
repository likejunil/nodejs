const {validator} = require('./index.js')
const {check, body, query} = require('express-validator');
const {page, size, sort, iftag} = require('./common.js');

const name = (target, key, necessary = true) => {
    const what = target ?? check;
    const field = key ?? 'name';
    return (necessary ? what(field) : what(field).if(what(field).exists()))
        .trim().notEmpty()
        .isLength({min: 1, max: 32})
        .withMessage('The name must be a minimum of 1 character and a maximum of 32 characters.');
};

const ifname = (t, k) => name(t, k, false);

const validate = (method, url) => {
    switch (`${method.toLowerCase()}|${url}`) {
        case 'post|/':
            return [
                iftag(body),
                name(body),
                validator,
            ];
        
        case 'get|/':
            return [
                page(query),
                size(query),
                /* validation 을 하면 같은 key 를 가진 여러개의 value 에 대하여 중복이 제거가 된다. */
                /* 여러개의 sort 를 처리해야 한다면 직접 검증 함수를 구현한다. */
                sort,
                ifname(body),
                validator,
            ];
    }
}

module.exports = {
    validate,
};