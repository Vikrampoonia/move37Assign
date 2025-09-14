import { createPollService, getPollWithResults, getPollWithResultService } from '../services/poll.service.js';


const getPolls = async (req, res) => {
    try {
        const poll = await getPollWithResultService();

        console.log("Poll : ",poll);
        res.status(200).json(poll);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createPoll = async (req, res) => {
    try {
    const { question, options, creatorId } = req.body;

    // Validation
    if (!question || !options ||  options.length < 2 || !creatorId) 
        return res.status(400).json({ message: 'Invalid input for creating a poll' });

    if(!Array.isArray(options) )
        return res.status(400).json({ message: 'Options should be an array' });
    
    if(options.length < 2)
        return res.status(400).json({ message: 'At least two options are required' });


    const poll = await createPollService(question, options, creatorId);
    console.log("Poll created: ",poll);
    res.status(201).json(poll);
  } 
  catch (error) 
  {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }

}


const getPollById = async (req, res) => {
    try {
        const { id } = req.params;
        const poll = await getPollWithResults(id);
        if (!poll) 
        {
            return res.status(404).json({ message: 'Poll not found' });
        }
        console.log("Poll fetched by id : ",poll);
        res.status(200).json(poll);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
 
}

export { getPolls, createPoll, getPollById };

