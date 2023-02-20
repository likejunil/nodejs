const fs = require('fs');
const path = require('path');
const {sequelize} = require('./initialize.js');

const MODEL_PATH = path.join(__dirname, "./model");

const filterModelFile = m => {
    if (m.slice(-3) !== '.js') return false;
    if (m[0] === '.') return false;
    /* ... 필요하다면 필터 조건 추가 ... */
    return true;
};

const defineModel = m => require(path.join(MODEL_PATH, m)).associate;

const associateModel = f => f(sequelize.models);

fs.readdirSync(MODEL_PATH)
    .filter(filterModelFile)
    .map(defineModel)
    .forEach(associateModel);

module.exports = sequelize;
