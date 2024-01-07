// models/userModel.js

const db = require('../config/database'); 
const { genSaltSync, hashSync,compareSync } = require("bcrypt");

const UserModel = {   
    listUsers: async () => {
        try {
          
          const [rows] = await db.promise().query('SELECT * FROM User');
    
          // Flattening the array and handling the buffer conversion
          const formattedRows = rows.map(row => {
            const formattedRow = { ...row };
            Object.keys(formattedRow).forEach(key => {
              if (Buffer.isBuffer(formattedRow[key])) {
                formattedRow[key] = formattedRow[key].toString();
              }
            });
            return formattedRow;
          });
    
          return formattedRows;
        } catch (error) {
          throw error;
        }
      },

      createUser: async (userData) => {
        try {
          // Use promise-based query to insert a new user
          const salt = genSaltSync(10);
          userData.password = hashSync(userData.password, salt);
          const [result] = await db.promise().query('INSERT INTO User SET ?', userData);
          const newUser = { id: result.insertId, ...userData };
          return newUser;
        } catch (error) {
          throw error;
        }
      },

      updateUser: async (userId, updatedUserData) => {
        try {
          // Check if the updatedUserData includes a password
          if (updatedUserData.password) {
            // Generate a salt and hash the password
            const salt = genSaltSync(10);
            const hashedPassword = hashSync(updatedUserData.password, salt);

            // Update the updatedUserData with the hashed password
            updatedUserData.password = hashedPassword;
          }
          // Use promise-based query to update an existing user
          await db.promise().query('UPDATE User SET ? WHERE id = ?', [updatedUserData, userId]);
    
          // Fetch the updated user from the database
          const [updatedUserRows] = await db.promise().query('SELECT * FROM User WHERE id = ?', userId);
          const updatedUser = updatedUserRows[0];
    
          return updatedUser;
        } catch (error) {
          throw error;
        }
      },

  deleteUser: async (userId) => {
    try {
      // Use promise-based query to delete user by ID
      const [result] = await db.promise().query('DELETE FROM User WHERE id = ?', userId);
      console.log(result);
      const affectedRows = result.affectedRows;
      if (affectedRows > 0) {
        console.log(`Successfully deleted ${affectedRows} record(s) with id ${userId}`);
        return { success: true }; // or you can return a success message or handle as needed
      } else {
        console.log(`No record found with id ${userId}`);
        return { success: false }; // or you can return a message or handle as needed
      }

    } catch (error) {
      throw error;
    }
  },
  // getUserByUserEmail: (email,callBack) => {
  //   db.query(
  //     `select * from User where email = ?`,
  //     [email],
  //     (error,results,fields) => {
  //       if(error){
  //         return callBack(error);
  //       }
  //       return callBack(null,results[0]);
  //     }
  //   );
  // },

  authenticateUser: async (email, password) => {
    try {
      console.log(email+" from authenticateUser: " + password);
      // const [rows] = await db.promise().query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password]);
      const [rows] = await db.promise().query('SELECT * FROM User WHERE email = ?', [email]);
      // const [rows] = await db.promise().query('SELECT * FROM User WHERE email = ? AND password = ?', [email, hashedPassword]);
      console.log(rows);
      if (rows.length === 1) {
        const user = rows[0];
        const isPasswordMatch = compareSync(password, user.password);
        if (isPasswordMatch) {
          return user;
      }
      }

      return null;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserModel;
