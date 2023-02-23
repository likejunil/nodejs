const fs = require('fs');
const path = require('path');
const {Router} = require('express');
const multer = require('multer');
const {isLoggedIn} = require('../middleware/passport/checkConnect.js');
const {rootPath} = require('../config/config.js');
const {afterUploadImage, uploadPost} = require('../controller/postCont.js');
const uploadDir = 'upload';

const router = Router();

/* upload 되는 파일들 위치 지정 */
const makeUploadPath = () => {
    const uploadPath = path.join(rootPath, uploadDir);
    try {
        fs.readdirSync(uploadPath);
    } catch (err) {
        fs.mkdirSync(uploadPath);
    }
};

/* 파일을 전송하기 위한.. */
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            /* 만약 에러가 발생하면 첫번째 인자에 에러 전달 */
            done(null, uploadDir)
        },
        filename(req, file, done) {
            /* 만약 에러가 발생하면 첫번째 인자에 에러 전달 */
            done(null, `${Date.now()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

/* 글만 올리기 위한.. */
const onlyPost = multer();

/**
 * single() 하나의 이름에 하나의 파일
 * array() 하나의 이름에 여러개의 파일
 * field() 여러개의 이름에 각각의 파일
 * none() 파일이 없음
 */
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);
router.post('/', isLoggedIn, onlyPost.none(), uploadPost);

makeUploadPath();
module.exports = router;
