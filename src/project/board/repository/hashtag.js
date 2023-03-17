const {Op, QueryTypes} = require("sequelize");
const {camel2snake} = require('../util/string.js');
const {sequelize} = require("./sequelize/associate");
const {Hashtag} = require("./sequelize/model/hashtag");
const {Band} = require("./sequelize/model/band");
const {queryWithTag} = require('./band.js');

const attributes = ['id'];

/* 존재하는 tag 를 조회한다. */
/* 없으면 null 반환 */
const findTag = async (tag) => tag && await HashTag.findOne({
    attributes,
    where: {tag},
});

/* 존재하는 tag 들을 조회한다. */
/* 없으면 null 반환 */
const findTags = async (tags) => {
    if (tags && tags.length > 0) {
        return await Hashtag.findAll({
            attributes,
            where: {tag: {[Op.in]: tags},}
        });
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

const queries = (() => {
    const map = new Map();
    map.set(`${Band.tableName}`, queryWithTag);
    return (key) => map.get(key);
})();

const queryTargetByTags = async (target, tags, offset, limit, sort) => {
    const list = (await findTags(tags)).map(m => m.id);
    const orderBy = `${sort[0]} ` + sort[1] ?? 'asc';
    const query = queries(target);
    
    const targets = ""
        + `SELECT ${camel2snake(query.target.join(', '))} `;
    const counts = ""
        + `SELECT COUNT(*) as count `;
    const body = ""
        + `FROM ${query.from} `
        + `WHERE id IN (SELECT DISTINCT ${query.whereTarget} FROM ${query.whereFrom} WHERE tag_id IN(:list)) `
    const tail = ""
        + `order by ${orderBy} `
        + `limit ${limit} `
        + `offset ${offset} `;
    
    const options = {
        replacements: {list,},
        type: QueryTypes.SELECT,
        raw: true,
    };
    
    const count = await sequelize.query(counts + body, options);
    const data = await sequelize.query(targets + body + tail, options);
    return {count: count[0].count, data};
};

module.exports = {
    queryTargetByTags,
    findTag,
    findTags,
    getTags,
};
