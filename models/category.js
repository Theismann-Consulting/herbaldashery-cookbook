const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      autopopulate: true,
    }],
    description: String,
}, {
    timestamps: true,
});

categorySchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Category', categorySchema);