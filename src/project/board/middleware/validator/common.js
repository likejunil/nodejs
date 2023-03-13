const {query, param} = require('express-validator');
const {passwordRegex, uniqueIdRegex} = require('./regex.js');

const uniqueId = (target, key) => {
    const field = key ?? 'uniqueId';
    return target(field)
        /* checkNull: true => null 일 경우 not exist */
        /* checkFalsy: true => "", 0, false, null 일 경우 not exist */
        .exists({checkNull: true, checkFalsy: true})
        .trim().notEmpty()
        .withMessage(`${field} is required`)
        .bail()
        /* 유니크 아이디는 영대소문자, 숫자, 언더바로 구성한다. */
        .matches(uniqueIdRegex)
        // .isLength({min: 1, max: 12})
        .withMessage('You can use uppercase and lowercase letters, numbers, and underscores.(min:1, max:12)')
};

const password = (target, key) => {
    const field = key ?? 'password';
    return target(field)
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Password is required.')
        .bail()
        .trim().notEmpty()
        .matches(passwordRegex)
        .withMessage('Please check the password conditions.');
}

const DEFAULT_PAGE = 0;
const page = () => {
    return query('page')
        .default(DEFAULT_PAGE)
        .isInt({min: 0}).toInt()
        .withMessage('Please check the page number.');
};

const DEFAULT_SIZE = 10;
const size = () => {
    return query('size')
        .default(DEFAULT_SIZE)
        .isInt({min: 1}).toInt()
        .withMessage('Please check the page size.');
};

const validateSort = (value) => {
    const sort = value.split(',');
    if (sort.length > 2) {
        throw new Error('Please check the sorting information.(count)');
    } else if (sort.length === 2) {
        const dir = sort[1].toLowerCase();
        if (dir !== 'desc' && dir !== 'asc') {
            throw new Error('Please check the sorting information.(direction)');
        }
    }
    return true;
};

const sort = (req, res, next) => {
    let {page, size, sort} = req.query;
    page = page ?? DEFAULT_PAGE;
    size = size ?? DEFAULT_SIZE;
    sort = sort ?? 'createdAt,desc';
    req.query.offset = page * size;
    req.query.limit = size;
    
    try {
        let list;
        /* sort 정보는 반드시 문자열 아니면 배열로 전달되어야만 한다. */
        /* 문자열도 배열도 아니라면 sort.length > 0 에서 예외를 발생시킨다. */
        if (typeof sort === 'string') {
            list = [sort];
        } else if (sort.length > 0) {
            list = sort;
        }
        
        req.query.sort = list
            .filter(m => validateSort(m))
            .map(m => m.split(','));
        
    } catch (err) {
        return next(err);
    }
    
    next();
};

const paramId = () => {
    return param('id')
        .isInt({gt: 0})
        .withMessage('Id must be a positive integer.');
};

module.exports = {
    page,
    size,
    sort,
    paramId,
    uniqueId,
    password,
};
