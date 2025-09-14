import { Router } from 'express';

import {  castVote} from '../controllers/vote.controller.js';

const router=Router();



router.post("/:pollId/vote",castVote);  // create a new vote for a specific poll


export default router;