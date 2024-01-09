const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/', UserController.createUser);
const authenticateToken = require('../auth/validateJWTmiddlewear');
router.use(authenticateToken);

router.get('/', UserController.listUsers);
// commented for now and moved this to line 5 as we wont be having the JWT token if we were to register a new user
// router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

// router.get('/users', authenticate, UserController.listUsers);

module.exports = router;
