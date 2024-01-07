const UserModel = require('../models/userModel');

const UserController = {
  listUsers: async (req, res) => {
    try {
      const users = await UserModel.listUsers();
      return res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createUser: async (req, res) => {
    const userData = req.body; 

    try {
      await UserModel.createUser(userData);
      return res.json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  

//   updateUser: async (req, res) => {
//     const userId = req.params.userId;
//     const userData = req.body;

//     try {
//       await UserModel.updateUser(userId, userData);
//       return res.json({ message: 'User updated successfully' });
//     } catch (error) {
//       console.error('Error updating user:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
updateUser: async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    console.log(req.body);
    const updatedUserData = req.body;

    try {
      const updatedUser = await UserModel.updateUser(userId, updatedUserData);
      return res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletionResult = await UserModel.deleteUser(userId);
  
        if (deletionResult.success) {
          return res.status(200).json({ success: true, message: `Successfully deleted user with id ${userId}` });
        } else {
          return res.status(404).json({ success: false, message: `No user found with id ${userId}` });
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
  },
};

module.exports = UserController;
