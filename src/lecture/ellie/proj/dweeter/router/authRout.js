import express from 'express';
import 'express-async-errors'

import * as controller from '../controller/authCont.js';
import validator from '../middleware/validator/authValidator.js';

/** path: auth */
const router = express.Router();

router.get("/list", controller.getAll);
router.post("/signup", validator("/signup"), controller.signup);
router.post("/login", validator("/login"), controller.login);

export default router;
