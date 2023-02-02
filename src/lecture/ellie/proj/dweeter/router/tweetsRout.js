import express from 'express';
import 'express-async-errors';

import validator from '../middleware/validator/tweetsValidator.js';
import * as controller from '../controller/tweetsCont.js';

/** path: tweets */
const router = express.Router();

/**
 * GET /tweets
 * POST /tweets
 * GET /tweets/:id
 * PUT /tweets/:id
 * DELETE /tweets/:id
 */
router.route("/")
    .get(controller.getList)
    .post(validator("post", "/"), controller.create);

router.route("/:id")
    .get(controller.getById)
    .put(validator("put", "/:id"), controller.update)
    .delete(controller.remove);

export default router;
