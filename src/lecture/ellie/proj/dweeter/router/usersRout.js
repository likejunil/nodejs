import express from 'express';
import validator from '../middleware/validator/usersValidator.js';

const router = express.Router();

/**
 * user = {
 *     "name": "준일",
 *     "age": 38,
 *     "email": "likejunil@gmail.com",
 *     "job": {
 *         "company": "june1",
 *         "title": "happy"
 *     }
 * }
 */

router.post("/:color", validator('/:color'), (req, res, next) => {
        console.log(req.body);
        res.sendStatus(201);
    }
);

export default router;
