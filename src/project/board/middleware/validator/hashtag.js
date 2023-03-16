const {query, check} = require('express-validator');
const {raiseError} = require("../../util/error");
const {validator} = require('./index.js');
const {size, page, sort} = require('./common.js');
const {tagbodyRegex} = require('./regex.js');

const at = (target, key, necessary = true) => {
    const what = target ?? check;
    const field = key ?? 'at';
    return (necessary ? what(field) : what(field).if(what(field).exists()))
        .default('all')
        .trim().notEmpty()
        .isIn(['all', 'band', 'board', 'content'])
}

const key = (target, key, necessary = true) => {
    const what = target ?? check;
    const field = key ?? 'key';
    return (necessary ? what(field) : what(field).if(what(field).exists()))
        .trim().notEmpty()
        .toLowerCase()
        .customSanitizer(value => {
            return value.split(',').map(m => {
                const match = m.match(tagbodyRegex);
                if (!match) raiseError(400, `Invalid tags: ${m}`);
                return m;
            });
        })
}

const validate = (method, url) => {
    switch (`${method.toLowerCase()}|${url}`) {
        case 'get|/':
            return [
                page(),
                size(),
                sort,
                at(query),
                key(query),
                validator,
            ];
    }
}

module.exports = {
    validate,
};
