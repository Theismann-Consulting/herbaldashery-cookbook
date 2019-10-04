const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: String,
  amount: String,
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipe: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
},{
  timestamps: true,
});

module.exports = mongoose.model('Ingredient', ingredientsSchema);