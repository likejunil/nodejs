import express from 'express';
import multer from 'multer';

import multerOpt from "../middleware/multer/multer.js";

const router = express.Router();
const upload = multer(multerOpt);

/**
 * req.file: {
 *   fieldname: 'image',
 *   originalname: 'cat.jpg',
 *   encoding: '7bit',
 *   mimetype: 'image/jpeg',
 *   destination: 'uploads/',
 *   filename: 'cat_20230201_081624_109.jpg',
 *   path: 'uploads/cat_20230201_081624_109.jpg',
 *   size: 425426
 * }
 *
 * req.body {
 *   animal: 'cat',
 *   color: 'blue'
 * }
 */

router.post('/one', upload.single('image'), (req, res) => {
    console.log('req.file:', req.file);
    console.log('req.body', req.body);
    res.send('ok');
});

router.post('/many', upload.array('image'), (req, res) => {
    console.log('req.files:', req.files);
    console.log('req.body', req.body);
    res.send('ok');
});

router.post('/multi',
    upload.fields([
        {name: 'cat'},
        {name: 'dog'},
    ]),
    (req, res) => {
        console.log('req.files:', req.files);
        console.log('req.body', req.body);
        res.send('ok');
    });

export default router;
