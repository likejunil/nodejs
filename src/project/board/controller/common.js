const {raiseError} = require('../util/error.js');

/**
 * "page": {
 *     "totalElements": 1,
 *     "totalPages": 1,
 *     "size": 100,
 *     "number": 0,
 *     "numberOfElements": 1,
 *     "first": true,
 *     "last": true
 * }
 */
const getPageInfo = (number, size, totalElements) => {
    if (number < 0 || size <= 0 && totalElements < 0)
        raiseError(400, 'Invalid page information.');
    
    const totalPages = Math.ceil(totalElements / size);
    const lastPage = (totalElements === 0) ? 0 : Math.floor((totalElements - 1) / size);
    const first = number === 0;
    const last = number === lastPage;
    const numberOfElements = (number < lastPage) ? size
        : totalElements < size ? totalElements
            : (totalElements - 1) % size + 1;
    return {
        totalElements,
        totalPages,
        size,
        number,
        numberOfElements,
        first,
        last,
    };
};

/**
 * data: {} | []
 * {
 *     result: 'fail' | 'succeed',
 *     page?: {},
 *     data?: {
 *         message?: string,
 *     },
 * }
 */
const setResponse = (info) => typeof info === 'string' ? {message: info} : info;

const succeed = (info, number, size, totalElements) => {
    const response = {};
    response.result = 'succeed';
    if (number != null && size != null && totalElements != null) {
        response.page = getPageInfo(number, size, totalElements);
    }
    response.data = setResponse(info);
    return response;
};

const fail = (info) => ({
    result: 'fail',
    data: setResponse(info)
});

module.exports = {
    succeed,
    fail,
};
