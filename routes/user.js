const express = require('express');
const jwt = require('jsonwebtoken');
const {
  userRegister,
  getAllUsers,
  getUserProfile,
  updateUser,
  deleteUser,
  userLogin,
  followUser,
  unfollowUser
} = require('../controllers/userController');

const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // If no token, not authorized

  jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.userId = userId; // Set the user context for subsequent handlers
      next();
  });
}



// User routes
router.post('/register', userRegister);
router.post('/login', userLogin);

router.get('/', getAllUsers);
router.get('/:username', getUserProfile);
router.put('/:username', updateUser);
router.delete('/:userId', deleteUser);

// Follow and unfollow routes
router.post('/follow', followUser);   // Assuming authentication middleware is applied where necessary
router.post('/unfollow/:unfollowId', unfollowUser); // Same assumption for authentication

module.exports = router;
