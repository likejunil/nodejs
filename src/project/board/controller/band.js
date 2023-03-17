const {succeed} = require('./common.js');
const {setError, raiseError} = require("../util/error");
const {sequelize} = require('../repository/sequelize/initialize.js');
const {createBand, getBands, getBand} = require('../repository/band.js');
const {getTags} = require('../repository/hashtag.js');

/**
 1. 밴드 생성
 2. 밴드 목록 조회
 3. 밴드 상세 조회
 4. 밴드 삭제
 */

const checkBand = (band) =>
    band ?? raiseError(400, 'Band does not exist.');

/**
 * POST /band
 */
const create = async (req, res, next) => {
    const t = await sequelize.transaction();
    const tr = {transaction: t};
    try {
        const {name, intro, tags} = req.body;
        const user = req.user;
        
        /* 이미 존재하는지 확인 */
        const load = await getBand({name});
        if (load) return next(setError(400, 'This name already exists.'));
        
        /* 생성하고 Manager 를 회원으로 연결 */
        const band = await createBand({name, intro, ownerId: user.id}, tr);
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
    getBand({id}, true, true)
        .then(band => res.json(succeed(checkBand(band))))
        .catch(next);
};

module.exports = {
    create,
    findBands,
    findById,
};
