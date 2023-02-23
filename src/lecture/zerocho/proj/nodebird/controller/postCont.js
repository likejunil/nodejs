const {Post} = require('../repository/sequelize/model/post.js');
const {Hashtag} = require('../repository/sequelize/model/hashtag.js');

/**
 * 파일을 업로드하고 나면..
 * - single 의 경우 req.file 이 생성된다.
 * - array, field 의 경우 req.files 가 생성된다.
 *      - array 의 경우 req.files 는 배열이 되고
 *      - field 의 경우 req.files 는 객체가 된다.
 * {
 *   fieldname: 'img',
 *   originalname: 'dog.jpeg',
 *   encoding: '7bit',
 *   mimetype: 'image/jpeg',
 *   destination: 'upload',
 *   filename: '1677017798994_dog.jpeg',
 *   path: 'upload/1677017798994_dog.jpeg',
 *   size: 7601
 * }
 */
const afterUploadImage = (req, res, next) => {
    res.json({url: `/img/${req.file.filename}`});
};

/* client 로부터 form 양식을 통해 "multipart/form-data" 로 데이터가 전송된다. */
/* req.body 에는 form 에 담겨 있는 데이터들의 name 이 담겨 있다. */
const uploadPost = async (req, res, next) => {
    /* 경우에 따라서 content, url 값이 존재하지 않을 수 있다. */
    const {content, url} = req.body;
    try {
        const created = await Post.create({
            content: content.trim(),
            img: url,
            /* 실제 컬럼 이름은 user_id 이지만 UserId 로 입력해야 한다. */
            UserId: req.user.id,
        });
        /* 다음의 함수를 사용하면 별도의 쿼리가 발생한다. */
        // await created.addUser(req.user);
        
        /* 정규표현식은 매칭 결과가 없으면 null 반환 */
        const hashtags = content.match(/#[^\s#]*/g);
        if (hashtags) {
            /* ret = [[model, true], [model.true], ...] */
            const ret = await Promise.all(hashtags.map(async tag =>
                Hashtag.findOrCreate({
                    where: {tag: tag.slice(1).toLowerCase()}
                })
            ));
            
            created.addHashtags(ret.map(m => m[0]));
        }
        
        res.redirect('/');
        
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    afterUploadImage,
    uploadPost,
};
