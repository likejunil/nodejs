import express from 'express';
import 'express-async-errors';

import validator from '../middleware/validator/tweetsValidator.js';
import * as controller from '../controller/tweetsCont.js';

/** path: tweets */
const router = express.Router();

/**
 * GET /tweets
 * GET /tweets/username
 * GET /tweets/:id
 * POST /tweets
 * PUT /tweets/:id
 * DELETE /tweets/:id
 */
router.get("/", controller.getList);
router.get("/:id", controller.getById);
router.post("/", validator("post", "/"), controller.create);
router.put("/:id", validator("put", "/:id"), controller.update);
router.delete("/:id", controller.remove);

export default router;
