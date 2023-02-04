import {Sequelize} from 'sequelize';
import config from '../../configure/config.js';
import tweet from './model/tweetsModel.js';
import user from './model/usersModel.js';

/* 데이터베이스 접속을 위한 정보 셋팅 */
const sequelize = new Sequelize(config.sequelize);

/* User 모델 생성 */
const User = user(sequelize);

/* Tweet 모델 생성 */
const Tweet = tweet(sequelize);

/*
User.hasMany(Tweet);
Tweet.belongsTo(User);
 */
User.hasMany(Tweet, {foreignKey: 'userId', sourceKey: 'id'});
Tweet.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

const Model = {
    User,
    Tweet,
};

export {sequelize, Model};
