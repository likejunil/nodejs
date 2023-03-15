/* [Op] 사용법 => https://sequelize.org/docs/v6/core-concepts/model-querying-basics/ */
const {Op} = require('sequelize');
const {succeed} = require('./common.js');
const {setError, raiseError} = require("../util/error");
const {sequelize} = require('../repository/sequelize/initialize.js');
const {Band} = require('../repository/sequelize/model/band.js');
const {User} = require("../repository/sequelize/model/user");
const {getTags, findTags} = require('./hashtag.js');

/**
 1. 밴드 생성
 2. 밴드 목록 조회
 3. 밴드 상세 조회
 4. 밴드 삭제
 */

const attributes = [
    'id',
    'name',
    'desc',
    'ownerId',
];

const include = {
    model: User,
    as: 'Members',
    attributes: ['id', 'uniqueId', 'nick'],
    through: {attributes: []},
    /* true: inner join */
    /* false: left outer join */
    required: false,
};

const getBand = async (query, members = false) => {
    const {id, name} = query;
    
    const where = {};
    if (id != null) {
        where.id = id;
    } else if (name != null) {
        where.name = name;
    }
    
    const options = {attributes, where};
    if (members) options.include = include;
    
    return await Band.findOne(options);
};

const getBands = async (query, members = false) => {
    const {name, ownerId} = query;
    const {page, size, offset, limit, sort} = query;
    
    const where = {};
    if (name != null) where.name = {[Op.like]: `%${name}%`};
    if (ownerId != null) where.ownerId = ownerId;
    
    const options = {attributes, where, sort, offset, limit,};
    if (members) options.include = include
    const {count, rows: bands} = await Band.findAndCountAll(options);
    
    return {count, page, size, bands}
};

const checkBand = (band) => band ?? raiseError(400, 'Band does not exist.');

/**
 * POST /band
 */
const create = async (req, res, next) => {
    const t = await sequelize.transaction();
    const tr = {transaction: t};
    try {
        const {name, desc, tags} = req.body;
        const user = req.user;
        
        /* 이미 존재하는지 확인 */
        const load = await getBand({name});
        if (load) return next(setError(400, 'This name already exists.'));
        
        /* 생성하고 Manager 를 회원으로 연결 */
        const band = await Band.create({name, desc, ownerId: user.id}, tr);
        await band.addMember(user, tr);
        
        /* 태그를 불러와서 연결 */
        const list = await getTags(tags);
        if (list && list.length > 0) await band.addTags(list, tr);
        
        await t.commit();
        res.json(succeed(`A new group has been created, bandId=|${band.id}|`));
        
    } catch (err) {
        await t.rollback();
        next(err);
    }
};

/**
 * GET /band
 */
const findBands = async (req, res, next) => {
    const {query} = req;
    getBands(query)
        .then(data => {
            const {count, page, size, bands} = data;
            res.json(succeed(bands, page, size, count));
        })
        .catch(next);
};

/**
 * GET /band/:id
 */
const findById = async (req, res, next) => {
    const {id} = req.params;
    getBand({id}, true)
        .then(band => res.json(succeed(checkBand(band))))
        .catch(next);
};

module.exports = {
    create,
    findBands,
    findById,
};
