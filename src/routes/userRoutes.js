const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.get('/user', UserController.getAllUsers);
router.get('/user/:id', UserController.getUserById);
router.delete('/user/:id', UserController.deleteUser);
router.put('/user/:id', UserController.updateUser);
router.post('/user', UserController.createUser);

module.exports = router;