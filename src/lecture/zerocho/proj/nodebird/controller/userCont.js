const {Op} = require('sequelize');
const {User} = require('../repository/sequelize/model/user.js');

const follow = async (req, res, next) => {
    /**
     * req.user.id 는 follow 를 하려는 주체
     * req.params.id 는 follow 를 당하는 대상
     */
    try {
        const users = await User.findAll({
            where: {
                id: {
                    [Op.in]: [req.user.id, req.params.id]
                }
            }
        });
        
        if (!users || users.length !== 2) {
            return res.status(400).send('사용자가 존재하지 않습니다.');
        }
        
        const ret = await req.user.addFollowing(parseInt(req.params.id, 10));
        res.send('팔로우 처리 완료되었습니다.');
        
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    follow,
};