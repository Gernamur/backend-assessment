import express from "express";
import { authenticate } from './auth.js'

import { indexController } from "./controllers/indexController.js";
import { postTokenController } from "./controllers/auth/postTokenController.js"
import { getUsersController } from "./controllers/users/getUsersController.js"
import { getUserByIdController } from "./controllers/users/getUserByIdController.js"
import { getPoliciesController } from "./controllers/policies/getPoliciesController.js"
import { getPolicyByIdController } from "./controllers/policies/getPolicyByIdController.js"

const router = express.Router();

router.get('/', indexController)
router.post('/token', postTokenController)
router.get('/users', authenticate({ roles: ['user'] }), getUsersController)
router.get('/users/:id', authenticate({ roles: ['user'] }), getUserByIdController)
router.get('/policies', authenticate(), getPoliciesController)
router.get('/policies/:id', authenticate(), getPolicyByIdController)

export default router

