const RecipeModel = require('../dataModels/recipeModel');
const UserModel = require('../dataModels/userModel');
const mongoose = require('mongoose');

// Post a new recipe
const postRecipe = async (req, res) => {
    try {
        const { title, ingredients, steps,userId } = req.body;
        const user = await UserModel.findById(userId); // Assuming user ID is in the request

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const newRecipe = new RecipeModel({
            title,
            user: userId,
            ingredients,
            steps
        });

        const savedRecipe = await newRecipe.save();

        // Add the recipe to the user's postedRecipes
        user.postedRecipes.push(savedRecipe);
        await user.save();

        res.status(201).json({ message: 'Recipe created!', recipe: savedRecipe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipeModel.find().populate('user', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for recipes
const searchRecipes = async (req, res) => {
    const { query } = req.query;
    try {
        const recipes = await RecipeModel.find({
            title: { $regex: query, $options: 'i' } // Case-insensitive search
        }).populate('user', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a specific recipe by ID
const getRecipeById = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.id).populate('user', 'username');
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a recipe
const updateRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found or user not authorized to update this recipe.' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found or user not authorized to delete this recipe.' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Like a recipe
const likeRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        // Check if the user has already liked the recipe
        if (recipe.likes.includes(req.user.id)) {
            return res.status(400).json({ message: 'User has already liked this recipe.' });
        }

        // If not, add user's like
        recipe.likes.push(req.user.id);
        await recipe.save();

        res.status(200).json({ message: 'Recipe liked successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Comment on a recipe
const commentOnRecipe = async (req, res) => {
    const { text } = req.body;
    try {
        const recipe = await RecipeModel.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }
        
        const comment = {
            text,
            user: req.user.id,
            date: new Date()
        };

        // Add the comment to the recipe
        recipe.comments.push(comment);
        await recipe.save();

        res.status(201).json({ message: 'Comment added successfully.', comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postRecipe,
    getAllRecipes,
    getRecipeById,
    searchRecipes,
    updateRecipe,
    deleteRecipe,
    likeRecipe,
    commentOnRecipe
};

