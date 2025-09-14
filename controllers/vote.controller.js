import { castVoteService } from '../services/vote.service.js';




const castVote = async (req, res) => {     
    try 
    {
        console.log("In caste vote req object: ",req.body);
        const { pollId } = req.params;
        const { userId, optionId } = req.body;
        const { io } = req;

        if (!userId || !optionId) 
            return res.status(400).json({ message: 'userId and optionId are required' });
        

    // In a real app, you'd also check if the optionId belongs to the pollId
    const vote = await castVoteService(userId, pollId, optionId,io);
    console.log("Vote cast: ",vote);
    res.status(200).json({ message: 'Vote cast successfully', vote });
  } 
  catch (error) 
  {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }

}

export { castVote};