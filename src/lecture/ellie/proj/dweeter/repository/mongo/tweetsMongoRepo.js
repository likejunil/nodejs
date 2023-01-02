import MongoDb from 'mongodb';
import {getCollection} from "./initMongo.js";
import * as userRepository from './usersMongoRepo.js';

const collection = 'tweets';
const getTweets = () => getCollection(collection);
const ObjectId = MongoDb.ObjectId;

export const create = async (body) => {
    /**
     * {
     *   acknowledged: true,
     *   insertedId: new ObjectId("63b1639bbfb41fc6bdf59c9b")
     * }
     */
    const {userId} = body;
    const user = await userRepository.findById(userId);
    if (user === null) {
        console.error(`해당 유저가 존재하지 않음, userId = |${userId}|`);
        return null;
    }
    
    const {username, name, email} = user;
    const tweet = {...body, username, name, email};
    getTweets
        .insertOne(tweet)
        .then(res => res.acknowledged
            ? findById(res.insertedId.toString())
            : null);
}

export const findById = async (id) => {
    return getTweets
        .findOne({_id: new ObjectId(id)})
        .then(mapOptionalTweet);
};

export const findByUsername = async (username) => {
    return (await getTweets
        .find({username}).sort({createdAt: -1}).toArray())
        .map(mapOptionalTweet);
};

export const findAll = async () => {
    return (await getTweets
        .find({}).sort({createdAt: -1}).toArray())
        .map(mapOptionalTweet);
};

export const update = async (save) => {
    const {id, text} = save;
    return getTweets
        .updateOne({_id: new ObjectId(id)}, {text})
        .then(res => {
            console.log(res);
            return res;
        });
};

export const remove = async (id) => {
    return getTweets
        .deleteOne({_id: new ObjectId(id)})
        .then(res => {
            console.log(res);
            return res;
        });
    
};

const mapOptionalTweet = (tweet) => {
    return tweet ? {...tweet, id: tweet._id.toString()} : tweet;
}
