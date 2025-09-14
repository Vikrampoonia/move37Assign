import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

const createUserService = async (name, email, password) => {
  // Hash the password before storing it
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });
  return newUser;
};


const getAllUserService = async () => {
  const users = await prisma.user.findMany({  select: {
            id: true,
            name: true,
            email: true,
            createdPolls: true, // You can include relations if needed
            votes: true
        }});
  return users;
};

const getUserByIdService = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
      select: {
            id: true,
            name: true,
            email: true,
            createdPolls: true, // You can include relations if needed
            votes: true
        }
  });
  return user;
};  

export {createUserService, getAllUserService, getUserByIdService}