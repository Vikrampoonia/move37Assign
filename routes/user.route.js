import { Router } from 'express';

import { getUsers, createUser , getUserById} from '../controllers/user.controller.js';

const router=Router();

router.get("/user",getUsers);  // retrieve all users
router.post("/user",createUser);  // create a new user
router.get("/user/:id",getUserById);  // retrieve a specific user

export default router;