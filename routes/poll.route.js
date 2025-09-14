import { Router } from 'express';

import { getPolls, createPoll , getPollById} from '../controllers/poll.controller.js';

const router=Router();

router.get("/poll",getPolls);  // retrieve all polls with poll options
router.get("/poll/:id",getPollById);  // retrieve a specific poll with poll options
router.post("/poll",createPoll);  // create a new poll  



export default router;