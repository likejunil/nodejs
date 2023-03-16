/* [Op] 사용법 => https://sequelize.org/docs/v6/core-concepts/model-querying-basics/ */
const {Op} = require('sequelize');
const {Hashtag} = require("../repository/sequelize/model/hashtag.js");
const {succeed} = require('../controller/common.js');

/* 존재하는 tag 를 조회한다. */
/* 없으면 null 반환 */
const findTag = async (tag) => tag && await HashTag.findOne({where: {tag}});

const findTags = async (tags) => {
    if (tags && tags.length > 0) {
        return await Hashtag.findAll({where: {tag: {[Op.in]: tags},}});
    }
};

/* 없으면 만들어서라도 반환한다. */
const getTags = async (tags) => {
    /* tag 가 존재한다면 validation 에 의해서 array 로 변환된다. */
    if (tags && tags.length > 0) {
        /* findOrCreate() 는 transaction 을 지원하지 않는다. */
        const map = tags.map(tag => Hashtag.findOrCreate({where: {tag}}));
        const list = await Promise.all(map);
        /* list = [[model, true], [model.true], ...] */
        return list.map(m => m[0]);
    }
}

/**
 * GET /tag
 */
const find = async (req, res, next) => {
    const {at, key: tags} = req.query;
    const {page, size, offset, limit, sort} = req.query;
    
    try {
        const list = await findTags(tags);
        switch (at) {
            case 'band':
                
                break;
            case 'board':
            case 'content':
            case 'all':
                break;
        }
        
    } catch (err) {
        next(err);
    }
};

module.exports = {
    findTag,
    findTags,
    getTags,
    find,
};
