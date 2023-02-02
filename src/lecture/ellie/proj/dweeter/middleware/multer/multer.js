import config from "../../configure/config.js";
import path from "path";
import multer from "multer";
import j1 from "../../util/j1lib.js";

const diskStorageOpt = {
    destination(req, file, done) {
        done(null, config.multer.uploadPath);
    },
    
    filename(req, file, done) {
        /* 확장자는 "." 을 포함한다. */
        const ext = path.extname(file.originalname);
        /* 확장자를 제외한 파일 이름 + 밀리초(from 1970.01.01) + 확장자 */
        done(null, path.basename(file.originalname, ext) + '_' + j1.strftime('%Y%m%d_%H%M%S_%ms') + ext);
    }
};

const multerOpt = {
    storage: multer.diskStorage(diskStorageOpt),
    limits: {fileSize: config.multer.fileSize}
};

export default multerOpt;
