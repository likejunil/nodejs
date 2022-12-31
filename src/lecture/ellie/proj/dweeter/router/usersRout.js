import express from 'express';
import 'express-async-errors'

import validator from '../middleware/validator/usersValidator.js';
import * as controller from '../controller/usersCont.js';

/** path: auth */
const router = express.Router();

/**
 * GET /users/list
 * POST /users/signup
 * POST /users/login
 */
router.get("/list", controller.getAll);
router.post("/signup", validator("post", "/signup"), controller.signup);
router.post("/login", validator("post", "/login"), controller.login);

export default router;
