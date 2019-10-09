const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    prepTime: String,
    cookTime: String,
    instructions: Object,
    instructionsHtml: String,
    instructionsString: String,
    ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    }],
    contributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Catgory',
    }],
    description: String,
    mealPlan: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealPlan',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Recipe', recipeSchema);