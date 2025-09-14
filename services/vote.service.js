import { PrismaClient } from '@prisma/client';
import { getPollWithResults } from './poll.service.js';
const prisma = new PrismaClient();

const castVoteService = async (userId, pollId, optionId, io) => {
    const vote = await prisma.vote.upsert({
        where: {
            userId_pollId: { // The unique compound key from our schema
                userId,
                pollId,
            },
        },
        update: { // If vote exists, update the chosen option
            optionId,
        },
        create: { // If vote doesn't exist, create it
            userId,
            pollId,
            optionId,
        },
  });



  const updatedPollResults = await getPollWithResults(pollId);

  // Broadcast the new results to everyone in the specific poll's room
  io.to(pollId).emit('update_votes', updatedPollResults);

  console.log(`Broadcasted vote update to room: ${pollId}`);

  return vote;
}

export { castVoteService } ;