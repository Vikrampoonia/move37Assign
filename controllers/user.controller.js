import {createUserService, getAllUserService, getUserByIdService} from '../services/user.service.js';


const getUsers = async (req, res) => {
    try 
    {
        const users = await getAllUserService();
        res.status(200).json(users);
    } 
    catch (error) 
    {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUserById= async(req,res) =>{
    try 
    {
        const { id } = req.params;
        const user = await getUserByIdService(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

}

const createUser = async (req, res) => {
    try 
    {
        const { name, email, password } = req.body;
        console.log("req.body:",req.body);

        // Basic validation
        if (!name || !email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        //email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return res.status(400).json({ message: 'Invalid email format' });
        

        const user = await createUserService(name, email, password);
        console.log("User created: ",user);
        const { passwordHash, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
  } 
  catch (error) 
  {
    // Handle specific errors, like a duplicate email
    if (error.code === 'P2002') 
      return res.status(409).json({ message: 'Email already in use' });
    
    res.status(500).json({ message: 'Internal server error' });
  }
}


export { getUsers, createUser, getUserById };