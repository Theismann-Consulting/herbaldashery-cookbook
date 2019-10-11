const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const Category = require('../models/category');
const MealPlan = require('../models/mealPlan');

module.exports = {
  create,
  index,
  update,
  show,
  delete :deleteRecipe
};


async function index(req, res, next) {
  try {
    await Recipe.find({}, function (err, recipes){
      res.json({ recipes });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function show(req, res) {
  try {
    await Recipe.findById(req.params.id)
      .populate('ingredients')
      .populate('category')
      .exec(
        function(err, recipe){
        res.json({ recipe });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, recipe){
      req.body.ingredients.forEach(function(i){
        Ingredient.findByIdAndUpdate(i, {$push: {recipes: recipe._id}}, {new: true}, function(err, i){
        });
      });
      req.body.category.forEach(function(cat){
        Category.findByIdAndUpdate(cat, {$push: {recipes: recipe._id}}, {new: true}, function(err, c){
        });
      });
      req.body.mealPlan.forEach(function(mealPlan){
        MealPlan.findByIdAndUpdate(mealPlan, {$push: {recipes: recipe._id}}, {new: true}, function(err, mp){
        });
      });
      res.json({ recipe });
    });
  } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    await Recipe.findByIdAndDelete(req.params.id, function(err, recipe) {
      recipe.ingredients.forEach(function(i){
        Ingredient.findByIdAndUpdate(i, {$pull: {recipes: recipe._id}}, {new: true}, function(err, i){
        });
      });
      recipe.category.forEach(function(cat){
        Category.findByIdAndUpdate(cat, {$pull: {recipes: recipe._id}}, {new: true}, function(err, c){
        });
      });
      recipe.mealPlan.forEach(function(mealPlan){
        MealPlan.findByIdAndUpdate(mealPlan, {$pull: {recipes: recipe._id}}, {new: true}, function(err, mp){
        });
      });
    res.json({ recipe });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function create(req, res) {
  const recipe = new Recipe(req.body);
  recipe.contributor = req.user;
  try {
    await recipe.save(function(err, recipe){
      req.body.ingredients.forEach(function(i){
        Ingredient.findByIdAndUpdate(i, {$push: {recipes: recipe._id}}, {new: true}, function(err, i){
        });
      });
      req.body.category.forEach(function(cat){
        Category.findByIdAndUpdate(cat, {$push: {recipes: recipe._id}}, {new: true}, function(err){
        });
      });
      req.body.mealPlan.forEach(function(mealPlan){
        MealPlan.findByIdAndUpdate(mealPlan, {$push: {recipes: recipe._id}}, {new: true}, function(err){
        });
      });
      res.json({ recipe });
    });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}




/*----- Helper Functions -----*/
