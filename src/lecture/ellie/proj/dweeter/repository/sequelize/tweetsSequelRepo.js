// https://any-ting.tistory.com/51
import {Sequelize} from "sequelize";
import {Model} from './initSequelize.js';

/**
 * . create()
 * . update()
 * . remove()
 * . findAll()
 * . findById()
 * . findByUsername()
 */

const {User, Tweet} = Model;

export const create = async (userId, body) => {
    const {text} = body;
    const save = {text, userId};
    return Tweet
        .create(save)
        .then(res => findById(res.dataValues.id));
}

const attributes = [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.email'), 'email'],
];

const include = {
    model: User,
    attributes: [],
};

const order = [
    ['created_at', 'desc']
];

export const findById = async (id) => {
    return Tweet
        .findByPk(id, {
            attributes,
            include,
            order,
        })
        .then(res => res ? res.dataValues: null);
    
};

export const findByUsername = async (username) => {
    return Tweet.findAll({
        attributes,
        order,
        include: {
            ...include,
            where: {username,},
        },
    });
};

export const findAll = async () => {
    return Tweet.findAll({
        attributes,
        include,
        order,
    });
};

export const update = async (tweet) => {
    const {id} = tweet;
    return Tweet
        .findByPk(id)
        .then(res => res.set(tweet).save());
};

export const remove = async (id) => {
    return Tweet
        .findByPk(id)
        .then(res => res.destroy());
};
