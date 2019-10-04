
const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    name: String,
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    description: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Meal Plan', mealPlanSchema);