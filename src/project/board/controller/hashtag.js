const {succeed} = require('../controller/common.js');
const {queryTargetByTags} = require('../repository/hashtag.js');

/**
 * GET /tag
 */
const find = async (req, res, next) => {
    const {at: target, key: tags} = req.query;
    const {page, size, offset, limit, sort} = req.query;
    
    queryTargetByTags(target, tags, offset, limit, sort[0])
        .then(d => res.json(succeed(d.data, page, size, d.count)))
        .catch(next);
};

module.exports = {
    find,
};
