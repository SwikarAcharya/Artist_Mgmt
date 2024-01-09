require('dotenv').config();
const express = require('express');
const routes = require('./config/routes');
const app = express();
const port = process.env.APP_PORT || 5000;
const cors = require('cors');
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });