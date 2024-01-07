const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const authenticateToken = require('../auth/validateJWTmiddlewear');
router.use(authenticateToken);

router.get('/', UserController.listUsers);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

// router.get('/users', authenticate, UserController.listUsers);

module.exports = router;
