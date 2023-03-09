const {Band} = require('../repository/sequelize/model/band.js');

/**
 1. 밴드 목록 조회
 2. 밴드 생성
 3. 밴드 상세 조회
 4. 밴드 삭제
 */

const attributes = [
    'id',
    'name',
    'desc',
];

const order = [
    ['createAt', 'DESC'],
];

const findAll = (req, res, next) => {
    Band.findAll({attributes, order})
        .then(bands => res.json(bands))
        .catch(next);
};

module.exports = {};
