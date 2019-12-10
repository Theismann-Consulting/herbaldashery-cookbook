const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
<<<<<<< HEAD
    category: String,
    prepTime: String,
    cookTime: String,
    instructions: String,
    instructionsHtml: String,
    instructionsString: String,
    ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
=======
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
>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
    }],
    contributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
<<<<<<< HEAD
    },
    category: [{
      type: String,
      default: 'Unassigned',
    }],
    description: String,
=======
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
>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
}, {
    timestamps: true,
});

<<<<<<< HEAD
=======
recipeSchema.plugin(require('mongoose-autopopulate'));
>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
module.exports = mongoose.model('Recipe', recipeSchema);