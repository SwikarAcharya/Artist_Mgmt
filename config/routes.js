const express = require('express');
const router = express.Router();
const userRoutes = require('../routes/userRoutes');
const authRoutes = require('../routes/authRoutes');
const artistRoutes = require('../routes/artistRoutes');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/artist', artistRoutes);

module.exports = router;
