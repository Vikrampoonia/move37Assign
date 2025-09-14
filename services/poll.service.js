import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createPollService = async (question, options, creatorId) => {
    try {
        const poll = await prisma.poll.create({
            data: 
            {
                question, 
                creatorId,
                options: 
                {
                    create: options.map(optionText => ({ text: optionText })),
                },
            },
            include: 
            {
                options: true, // Include the newly created options in the response
            },
        });
        return poll;
    } catch (error) 
    {
        throw new Error('Error creating poll');
    }
};


const getPollWithResults  = async (pollId) => {
     const poll = await prisma.poll.findUnique({
        where: { id: pollId },
        include: {
            creator: {
                select: { id: true, name: true }
            },
            options: {
                include: {
                    _count: {
                        select: { votes: true }
                    }
                }
            }
        }
    });
    return poll;

}

const getPollWithResultService  = async () => {
     const polls = await prisma.poll.findMany({
        include: {
            creator: {
                select: { id: true, name: true }
            },
            options: {
                include: {
                    _count: {
                        select: { votes: true }
                    }
                }
            }
        }
    });
    return polls;

}

export { createPollService, getPollWithResults , getPollWithResultService } ;