const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    }],
    description: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Category', categorySchema);