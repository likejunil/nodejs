import {Model} from "./initSequelize.js";

/**
 * UsersRepository 는 다음 4가지 method 를 구현한다.
 * . create()
 * . findAll()
 * . findById()
 * . findByUsername()
 */

const {User} = Model;

export const create = async (user) => {
    return User
        .create(user)
        .then(res => {
            const id = res.dataValues.id;
            return {...user, id};
        });
};

export const findById = async (id) => {
    return User.findByPk(id)
};

export const findByUsername = async (username) => {
    return User.findOne({where: {username}});
};

export const findAll = async () => {
    return User.findAll();
};
