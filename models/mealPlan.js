
const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    name: String,
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      autopopulate: true,
    }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
    assignedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    }],
    description: String,
}, {
    timestamps: true,
});

mealPlanSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('MealPlan', mealPlanSchema);