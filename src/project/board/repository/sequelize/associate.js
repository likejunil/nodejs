const fs = require('fs');
const path = require('path');
const {sequelize} = require('./initialize.js');
const MODEL_PATH = path.join(__dirname, 'model');

const filterFile = filename => {
    /* .js */
    if (!filename.endsWith('.js')) return false;
    /* hidden file */
    if (filename.startsWith('.')) return false;
    return true;
};

const defineModel = filename => {
    const {associate} = require(path.join(MODEL_PATH, filename));
    return associate;
}

const associateModel = associate => {
    associate(sequelize.models);
};

/* 파일 목록을 배열로 반환 */
fs.readdirSync(MODEL_PATH)
    .filter(filterFile)
    .map(defineModel)
    .forEach(associateModel);

module.exports = {
    sequelize,
};
