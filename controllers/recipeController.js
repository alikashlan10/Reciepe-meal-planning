const Recipe = require('../dataModels/recipeModel');

// Logic to list all recipes
exports.listRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'username');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving recipes', error: error.message });
  }
};

// Logic to create a recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, cookingInstructions, photos, nutritionalFacts } = req.body;
    // Ensure that user data is included in the req.body or extracted from a session/authorization token
    const user = req.user;

    const recipe = new Recipe({
      title,
      ingredients,
      cookingInstructions,
      photos,
      nutritionalFacts,
      user: user._id // Assuming the user model's _id is stored in the session or token
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error: error.message });
  }
};

// Logic to get a single recipe
exports.getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate('user', 'username');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving recipe', error: error.message });
  }
};

// Logic to like a recipe
exports.likeRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Extract this from the session or token

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the user has already liked the recipe to prevent duplicate likes
    if (recipe.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this recipe' });
    }

    recipe.likes.push(userId);
    await recipe.save();
    res.status(200).json({ message: 'Recipe liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking recipe', error: error.message });
  }
};

// Logic to comment on a recipe
exports.commentOnRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body; // 'text' should be the comment text
    const userId = req.user._id; // Extract this from the session or token

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const comment = {
      text,
      user: userId,
      createdAt: new Date() // Or let Mongoose handle it if timestamps are set in the schema
    };

    recipe.comments.push(comment);
    await recipe.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error commenting on recipe', error: error.message });
  }
};
