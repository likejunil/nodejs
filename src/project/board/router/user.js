const {Router} = require('express');
const {findById, findUsers, updateById, deleteById} = require('../controller/user.js');

const user = new Router();

user.get('/', findUsers);
user.route('/:id')
    .get(findById)
    .put(updateById)
    .delete(deleteById);

module.exports = user;
