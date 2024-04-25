const express = require('express');
const {
  userRegister,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
  followUser,
  unfollowUser
} = require('../controllers/userController');

const router = express.Router();

// User routes
router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/', getAllUsers);
router.get('/:username', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

// Follow and unfollow routes
router.post('/follow/:followId', followUser);   // Assuming authentication middleware is applied where necessary
router.post('/unfollow/:unfollowId', unfollowUser); // Same assumption for authentication

module.exports = router;
