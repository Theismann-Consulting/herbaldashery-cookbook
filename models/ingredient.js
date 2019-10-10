const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: String,
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  recipe: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    autopopulate: true,
  }],
},{
  timestamps: true,
});

ingredientsSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Ingredient', ingredientsSchema);