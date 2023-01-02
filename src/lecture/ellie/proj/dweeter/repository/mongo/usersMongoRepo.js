import MongoDb from 'mongodb';
import {getCollection} from "./initMongo.js";

/**
 * UsersRepository 는 다음 4가지 method 를 구현한다.
 * . create()
 * . findAll()
 * . findById()
 * . findByUsername()
 */

const collection = 'users';
const getUsers = () => getCollection(collection);
const ObjectId = MongoDb.ObjectId;

/**
 * 생성
 */
export const create = async (user) => {
    /**
     * {
     *   acknowledged: true,
     *   insertedId: new ObjectId("63b1639bbfb41fc6bdf59c9b")
     * }
     */
    return getUsers
        .insertOne(user)
        .then(res => res.acknowledged ? findById(res.insertedId.toString()) : null);
};

/**
 * 조회 (username)
 */
export const findByUsername = async (username) => {
    /**
     * 해당 데이터가 존재하지 않으면 res => null;
     * {
     *   _id: new ObjectId("63b164bf5fe1e6c4bf62a49e"),
     *   username: 'june1',
     *   password: '$2b$10$ZuOStQJ/gk0sUwopdqFedeWuwllyTo9kaXBJLNPR699ThmuST11fK',
     *   name: '준일',
     *   email: 'likejunil@gmail.com'
     * }
     */
    return getUsers
        .findOne({username})
        .then(mapOptionalUser);
};

/**
 * 조회 (id)
 */
export const findById = async (id) => {
    /**
     * 해당 데이터가 존재하지 않으면 res => null;
     * {
     *   _id: new ObjectId("63b166527bf95a465769c458"),
     *   username: 'june1',
     *   password: '$2b$10$Ky.argDU13VARnGVxqUJZeB4FjQL7GQls1DDNa1fEjwdeVcfuAOQe',
     *   name: '준일',
     *   email: 'likejunil@gmail.com'
     * }
     */
    return getUsers
        .findOne({_id: new ObjectId(id)})
        .then(mapOptionalUser);
};

/**
 * 조회 (all)
 */
export const findAll = async () => {
    const list = await getUsers.find({}).toArray();
    return list.map(mapOptionalUser);
};

/**
 * 몽고디비에서 검색한 사용자의 정보를 변환하여 반환
 */
const mapOptionalUser = (user) => {
    return user ? {...user, id: user._id.toString()} : user;
};
