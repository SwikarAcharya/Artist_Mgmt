const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 5000;

app.get('/api', (req, res) => {
    res.status(200).send({
      success: 1,
      message: 'Welcome to the API',
    });
  
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });