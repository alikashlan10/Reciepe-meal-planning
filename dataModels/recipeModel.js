const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
    title: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ingredients: [String],
    steps: [String],
    comments: [{ body: String, date: Date }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
  });
  
  module.exports = mongoose.model('Recipe', recipeSchema);