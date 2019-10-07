const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');

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