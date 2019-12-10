const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
<<<<<<< HEAD

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    delete: deleteRecipe,
    edit,
    update,
};

function index(req, res) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  Recipe.find(modelQuery)
  .exec(function(err, recipes) {
    if (err) return next(err);
      Recipe.find({}, function (err, recipes){
        res.render('recipes/index', {
          recipes,
        contributor: req.user,
        name: req.query.name,
      });
    });
  });
};

function show(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
      Ingredient.find({ recipe: recipe._id }, function(err, ingredients){
          res.render('recipes/show', { 
          recipe,
          contributor: req.user,
          ingredients,
         });
      });
    });
};

function newRecipe(req, res) {
    res.render('recipes/new', {
        contributor: req.user,
      });
}

function create(req, res) {
    const recipe = new Recipe(req.body);
    recipe.contributor = req.user;
    recipe.save(function(err) {
        if (err) {return res.render('recipes/new', {
          contributor: req.user
        })};
        Ingredient.find({ recipe: recipe._id }, function(err, ingredients){
          res.render('recipes/ingredients/index',{
          contributor: req.user,
          recipe,
          ingredients,
          });
        });
    });
};

function deleteRecipe(req, res, next) {
  Recipe.findByIdAndDelete(req.params.id, function(err, r) {
    Ingredient.updateMany({recipe: r}, {$pull: {recipe: r._id}},
      function(err, i){
        next();
        
    });
  });
};

function edit(req, res){
  Recipe.findById({ _id: req.params.id }, function(err, recipe){
    res.render('recipes/edit', {
      recipe,
      contributor: req.user,
    });
  });
};

function update(req, res) {
  Recipe.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true}, function(err, recipe){
    Ingredient.find({ recipe: recipe._id }, function(err, ingredients){
      res.render(`recipes/ingredients/index`,{
        contributor: req.user,
        recipe,
        ingredients,
        });
    });
  });
};
=======
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
>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
