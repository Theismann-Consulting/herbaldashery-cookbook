const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: String,
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
},{
  timestamps: true,
});

ingredientsSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Ingredient', ingredientsSchema);