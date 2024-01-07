require('dotenv').config();
const { compareSync } = require("bcrypt");
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secretKey = process.env.JWT_SECRET;

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(email+ "from login: ");
    try {
      const user = await userModel.authenticateUser(email, password);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      else {
            const token = jwt.sign({ userId: user.id, role: user.role_type }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        }
    //   const token = jwt.sign({ userId: user.id, role: user.role_type }, secretKey, { expiresIn: '1h' });

    //   res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = authController;
