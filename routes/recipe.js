const express = require('express');
const router = express.Router();
const {
  postRecipe,
  getAllRecipes,
  getRecipeById,
  searchRecipes,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
  commentOnRecipe
} = require('../controllers/recipeController');
const requireAuth = require('../middleware/requireAuth')
const authenticateToken = require('../middleware/requireAuth')

//authentcation middleware
router.use(authenticateToken)

// Create a new recipe
router.post('/', postRecipe);

// Get all recipes
router.get('/', getAllRecipes);

// Get a single recipe by ID
router.get('/:id', getRecipeById);

// Search for recipes
router.get('/search/:query', searchRecipes);

// Update a recipe
router.put('/:id', updateRecipe);

// Delete a recipe
router.delete('/:id', deleteRecipe);

// Like a recipe
router.post('/like/:id', likeRecipe);

// Comment on a recipe
router.post('/comment/:id', commentOnRecipe);

module.exports = router;
