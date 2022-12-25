import express from 'express';
import 'express-async-errors';
import * as controller from '../controller/tweetsCont.js';
import validator from '../middleware/validator/tweetsValidator.js';

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
router.post("/", validator("/"), controller.create);
router.put("/:id", validator("/:id"), controller.update);
router.delete("/:id", controller.remove);

export default router;
