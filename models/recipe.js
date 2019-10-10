const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    prepTime: String,
    cookTime: String,
    instructions: Object,
    instructionsHtml: String,
    instructionsString: String,
    ingredientsAmount: [String],
    ingredientsName: [String],
    ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      autopopulate: true,
    }],
    contributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
    category: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      autopopulate: true,
    }],
    description: String,
    mealPlan: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealPlan',
      autopopulate: true,
    }],
}, {
    timestamps: true,
});

recipeSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Recipe', recipeSchema);