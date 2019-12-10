const Ingredient = require('../models/ingredient');
<<<<<<< HEAD
const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteIngredient,
    update,
    clean,
};


function create(req, res) {
    const ingredient = new Ingredient(req.body);
    ingredient.contributor = req.user;
    ingredient.save(function(err, i) {
      if (err) {return res.render('recipes/ingredients/index', {
        contributor: req.user
      })};
      Recipe.findById(ingredient.recipe, function(err, recipe){
        recipe.ingredients.push(i);
        recipe.save(function(err, r){
          Ingredient.find({ recipe: r._id }, function(err, ingredients){
            res.render('recipes/ingredients/index',{
              contributor: req.user,
              recipe,
              ingredients,
            });
          });
        });
      });
    });
};

function deleteIngredient(req, res, next) {
  Ingredient.findByIdAndDelete(req.params.id, function(err, i) {
    Recipe.updateMany({ingredients: i}, {$pull: {ingredients: i._id}}, function(err){
      Recipe.findById(i.recipe, function(err, recipe){
        Ingredient.find({ recipe: recipe._id }, function(err, ingredients){
          res.render('recipes/ingredients/index', {
            contributor: req.user,
            recipe,
            ingredients,
          });
        });
      });
    });
  });
};

function clean(req, res, next){
  Ingredient.deleteMany({recipe: {$size: 0}}, function (err, i) {
    res.redirect('/recipes');
  });
}

function update(req, res) {
  Ingredient.update({ _id: req.params.id }, req.body, function(err){
    res.redirect(`/ingredients/${req.params.id}`);
  });
};
=======

module.exports = {
  create,
  index,
  update,
  show,
  delete :deleteIngredient
};


async function index(req, res, next) {
  try {
    await Ingredient.find({}, function (err, ingredients){
      res.json({ ingredients });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function show(req, res) {
  try {
    await Ingredient.findById(req.params.id, function(err, ingredient) {
        res.json({ ingredient });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await Ingredient.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, ingredient){
      res.json({ ingredient });
    })
  } catch (err) {
      res.status(400).json(err);
  }
}

async function deleteIngredient(req, res, next) {
  try {
    await Ingredient.findByIdAndDelete(req.params.id, function(err, ingredient) {
      res.json({ ingredient });
  });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function create(req, res) {
  const ingredient = new Ingredient(req.body);
  ingredient.contributor = req.user;
  try {
    await ingredient.save();
    res.json({ ingredient });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}




/*----- Helper Functions -----*/
>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
