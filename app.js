const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });