const sequelize = require('./initSequelize.js');
const User = require('./model/user.js');
const Profile = require('./model/profile.js');
const Family = require('./model/family.js');
const Band = require('./model/band.js');
const Board = require('./model/board.js');
const Comment = require('./model/comment.js');
const File = require('./model/file.js');

const models = {User, Profile, Family, Band, Board, Comment, File};

/* onDelete, onUpdate: 'RESTRICT', 'CASCADE', 'NO ACTION', 'SET DEFAULT', 'SET NULL' */

/* User(1):(1)Profile */
User.Profile = User.hasOne(Profile, {foreignKey: 'userId', sourceKey: 'id'});
Profile.User = Profile.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

/* Family(1):(N)User */
Family.User = Family.hasMany(User, {foreignKey: 'familyId', sourceKey: 'id'});
User.Family = User.belongsTo(Family, {foreignKey: 'familyId', targetKey: 'id'});

/* User(N):(M)Band */
User.Band = User.belongsToMany(Band, {through: 'member_band', timestamps: false});
Band.User = Band.belongsToMany(User, {through: 'member_band', timestamps: false});

/* User(1):(N)Board */
User.Board = User.hasMany(Board, {foreignKey: 'userId', sourceKey: 'id'});
Board.User = Board.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

/* Band(1):(N)Board */
Band.Board = Band.hasMany(Board, {foreignKey: 'bandId', sourceKey: 'id'});
Board.Band = Board.belongsTo(Band, {foreignKey: 'bandId', targetKey: 'id'});

/* User(1):(N)Comment */
User.Comment = User.hasMany(Comment, {foreignKey: 'userId', sourceKey: 'id'});
Comment.User = Comment.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

/* Board(1):(N)Comment */
Board.Comment = Board.hasMany(Comment, {foreignKey: 'boardId', sourceKey: 'id'});
Comment.Board = Comment.belongsTo(Board, {foreignKey: 'boardId', targetKey: 'id'});

/* User(1):(N)File */
User.File = User.hasMany(File, {foreignKey: 'userId', sourceKey: 'id'});
File.User = File.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

/* Board(1):(N)File */
Board.File = Board.hasMany(File, {foreignKey: 'boardId', sourceKey: 'id'});
File.Board = File.belongsTo(Board, {foreignKey: 'boardId', targetKey: 'id', allowNull: true});

/* Comment(1):(N)File */
Comment.File = Comment.hasMany(File, {foreignKey: 'commentId', sourceKey: 'id'});
File.Comment = File.belongsTo(Comment, {foreignKey: 'commentId', targetKey: 'id', allowNull: true});

module.exports = {
    sequelize,
    models
};
