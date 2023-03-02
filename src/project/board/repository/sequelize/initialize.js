const {Sequelize} = require('sequelize');
const {sequelize: config} = require('../../config/config.js');

const sequelize = new Sequelize(config.option);

const defaultOpt = {
    timestamp: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
};

module.exports = {
    sequelize,
    defaultOpt,
};
