// const express = require('express');
// const UserController = require('../controllers/userController');
// const RecipeController = require('../controllers/recipeController');

// const router = express.Router();


// // User routes
// // router.post('/users/register', UserController.register);
// // router.post('/users/login', UserController.login);
// // router.get('/users/profile/:userId', UserController.getUserProfile);
// // router.post('/users/follow', UserController.followUser);
// // router.post('/users/unfollow', UserController.unfollowUser);

// // // Recipe routes
// // router.get('/recipes', RecipeController.listRecipes);
// // router.post('/recipes', RecipeController.createRecipe);
// // router.get('/recipes/:recipeId', RecipeController.getRecipe);
// // router.post('/recipes/:recipeId/like', RecipeController.likeRecipe);
// // router.post('/recipes/:recipeId/comment', RecipeController.commentOnRecipe);

// // Add other routes as needed

// module.exports = router;

const express = require('express');
const {
  userRegister,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  userLogin
} = require('../controllers/userController');

const router = express.Router();

// User routes
router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/', getAllUsers);
router.get('/:username', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
