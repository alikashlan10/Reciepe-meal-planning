const ReviewModel = require('../dataModels/reviewModel');
const RecipeModel = require('../dataModels/recipeModel');

const addReviewToRecipe = async (req, res) => {
    try {
        const { rating, comment,recipeId,userId } = req.body;

        const newReview = new ReviewModel({
            recipe: recipeId,
            user: userId,
            rating,
            comment
        });

        const savedReview = await newReview.save();

        // Add the review to the recipe's reviews array
        const recipe = await RecipeModel.findByIdAndUpdate(
            recipeId,
            { $push: { reviews: savedReview._id } },
            { new: true }
        );

        res.status(201).json({ message: 'Review added successfully.', review: savedReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addReviewToRecipe}