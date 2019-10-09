const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');

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
      .populate('categories')
      .populate('mealPlans')
      .exec((function(err, recipe) {
        res.json({ recipe });
    }));
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, recipe){
      req.body.ingredients.forEach(function(i){
        Ingredient.findByIdAndUpdate(i, {$push: {recipe: recipe._id}}, {new: true}, function(err, i){
          console.log('error:', err, 'ingredient:', i);
        });
      });
      req.body.category.forEach(function(cat){
        Category.findByIdAndUpdate(cat, {$push: {recipe: recipe._id}}, {new: true}, function(err){
        });
      });
      req.body.mealPlan.forEach(function(mealPlan){
        MealPlan.findByIdAndUpdate(mealPlan, {$push: {recipe: recipe._id}}, {new: true}, function(err){
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
        Ingredient.findByIdAndUpdate(i, {$pull: {recipe: recipe._id}}, {new: true}, function(err, i){
          console.log('error:', err, 'ingredient:', i);
        });
      });
      recipe.category.forEach(function(cat){
        Category.findByIdAndUpdate(cat, {$pull: {recipe: recipe._id}}, {new: true}, function(err){
        });
      });
      recipe.mealPlan.forEach(function(mealPlan){
        MealPlan.findByIdAndUpdate(mealPlan, {$pull: {recipe: recipe._id}}, {new: true}, function(err){
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
        Ingredient.findByIdAndUpdate(i, {$push: {recipe: recipe._id}}, {new: true}, function(err, i){
          console.log('error:', err, 'ingredient:', i);
        });
      });
      req.body.category.forEach(function(cat){
        Category.findByIdAndUpdate(cat, {$push: {recipe: recipe._id}}, {new: true}, function(err){
        });
      });
      req.body.mealPlan.forEach(function(mealPlan){
        MealPlan.findByIdAndUpdate(mealPlan, {$push: {recipe: recipe._id}}, {new: true}, function(err){
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
