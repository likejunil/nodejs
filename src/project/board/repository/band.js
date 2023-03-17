/* [Op] 사용법 => https://sequelize.org/docs/v6/core-concepts/model-querying-basics/ */
const {Op} = require("sequelize");
const {User} = require("./sequelize/model/user.js");
const {Band} = require("./sequelize/model/band.js");
const {Hashtag} = require("./sequelize/model/hashtag.js");

const attributes = [
    'id',
    'name',
    'intro',
    'ownerId',
];

const includeUsers = {
    model: User,
    as: 'Members',
    attributes: ['id', 'uniqueId', 'nick'],
    through: {attributes: []},
    /* true: inner join */
    /* false: left outer join */
    required: false,
};

const includeTags = {
    model: Hashtag,
    as: 'Tags',
    attributes: ['tag'],
    through: {attributes: []},
    /* true: inner join */
    /* false: left outer join */
    required: false,
};

/**
 * select ${target}
 * from ${from}
 * where id in (select ${whereTarget} from ${whereFrom} where tag_id in ...)
 */
const queryWithTag = {
    target: attributes,
    from: Band.tableName,
    whereTarget: 'band_id',
    whereFrom: 'band_tag',
};

const createBand = async (body, tr) => {
    return Band.create(body, tr);
};

const getBand = async (query, members = false, tags = false) => {
    const {id, name} = query;
    
    const where = {};
    if (id != null) {
        where.id = id;
    } else if (name != null) {
        where.name = name;
    }
    
    const options = {attributes, include: [], where};
    if (members) options.include.push(includeUsers);
    if (tags) options.include.push(includeTags);
    
    return await Band.findOne(options);
};

const getBands = async (query, members = false, tags = false) => {
    const {name, ownerId} = query;
    const {page, size, offset, limit, sort: order} = query;
    
    const where = {};
    if (name != null) where.name = {[Op.like]: `%${name}%`};
    if (ownerId != null) where.ownerId = ownerId;
    
    const options = {attributes, where, include: [], order, limit, offset,};
    if (members) options.include.push(includeUsers);
    if (tags) options.include.push(includeTags);
    const {count, rows: bands} = await Band.findAndCountAll(options);
    
    return {count, page, size, bands}
};

module.exports = {
    queryWithTag,
    createBand,
    getBand,
    getBands,
};
