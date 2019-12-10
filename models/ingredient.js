const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: String,
<<<<<<< HEAD
  amount: String,
=======
>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
<<<<<<< HEAD
  recipe: [{
=======
  recipes: [{
>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
},{
  timestamps: true,
});

<<<<<<< HEAD
=======
ingredientsSchema.plugin(require('mongoose-autopopulate'));
>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
module.exports = mongoose.model('Ingredient', ingredientsSchema);