const {Band} = require('../repository/sequelize/model/band.js');
const {succeed} = require('./common.js');

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

const getBand = async (query) => {
    const {id, name} = query;
    const where = {};
    if (id != null) where.id = id;
    else if (name != null) where.name = name;
    
    return await Band.findOne({where, attributes});
};

const getBands = () => {
};

/**
 * POST /band
 */
const createOne = async (req, res, next) => {
    const {name, desc} = req.body;
    const user = req.user;
    const saved = await user.createGroup({name, desc, ownerId: user.id})
    res.json(succeed(`A new group has been created, bandId=|${saved.id}|`));
};

/**
 * GET /band
 */
const findBands = async (req, res, next) => {
    const {size, page, sort} = req.query;
};

/**
 * GET /band/:id
 */
const findById = async (req, res, next) => {
    const {id} = req.params;
    
};

module.exports = {
    createOne,
    findBands,
    findById,
};
