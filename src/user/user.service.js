// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    findUsers,
    findUserById,
    findUserByEmail,
    createUser
    // insertJob,
    // deleteJob,
    // editJob
  } = require("./user.repository");
  
  const getAllUsers = async () => {
    const users = await findUsers();
  
    return users;
  };
  
  const getUserById = async (id) => {
      const user = await findUserById(id);
    
      if (!user) {
        throw Error("User not found");
      }
    
      return user;
    };

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
    };
    
const registerUser = async (name, email, password) => {
    const hashedPassword = await hashPassword(password);
    return createUser(name, email, hashedPassword);
};

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    return token;
    };
    
    const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    
    if (user) {
        const match = await bcrypt.compare(password, user.password);
    
        if (match) {
            const token = generateToken(user);
            return token ;
          }
    }
    
    return null;
    };
  

    
  
  module.exports = {
    getAllUsers,
    getUserById,
    hashPassword,
    registerUser,
    authenticateUser
    //   createJob,
    //   deleteJobById,
    //   editJobById
  };