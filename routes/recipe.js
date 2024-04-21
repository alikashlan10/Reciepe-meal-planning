
// const {
//   listRecipes,
//   createRecipe,
//   getRecipe,
//   likeRecipe,
//   commentOnRecipe
// } = require('../controllers/recipeController');

// const router = express.Router();

const express = require('express');
const RecipeController = require('../controllers/recipeController');

// Create a new router instance for recipes
const router = express.Router();

// Route to list all recipes
router.get('/', RecipeController.listRecipes);

// Route to create a new recipe
// Make sure to protect this route with authentication middleware if needed
router.post('/create', RecipeController.createRecipe);

// Route to get a specific recipe by id
router.get('/:id', RecipeController.getRecipe);



// Route to like a recipe by id
// Make sure to protect this route with authentication middleware if needed
router.post('/:id/like', RecipeController.likeRecipe);

router.post('/:id/comment',RecipeController.commentOnRecipe);
// Route to comment on a recipe by id
// Make sure to protect this route with authentication


module.exports = router;
