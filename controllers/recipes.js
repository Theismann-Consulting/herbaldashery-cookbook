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
    await Recipe.findById(req.params.id, function(err, recipe) {
        res.json({ recipe });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, recipe){
      res.json({ recipe });
    })
   } catch(err) {
      res.status(400).json(err);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    await Recipe.findByIdAndDelete(req.params.id, function(err, recipe) {
      Ingredient.updateMany
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
    await recipe.save();
    if (Array.isArray(req.body.ingredients)){
      req.body.ingredients.map((i) =>
        Ingredient.findByIdAndUpdate(i, {$push: {recipes: recipe._id}}, {new: true}, function(err){
          res.status(400).json(err);
        })
      )
    } else if(req.body.ingredients._id){
      Ingredient.findByIdAndUpdate(i, {$push: {recipes: recipe._id}}, {new: true}, function(err){
        res.status(400).json(err);
      })
    };
    if (Array.isArray(req.body.category)){
      req.body.category.map((cat) =>
        Category.findByIdAndUpdate(cat, {$push: {recipes: recipe._id}}, {new: true}, function(err){
          res.status(400).json(err);
        })
      )
    } else if(req.body.ingredients._id){
      Category.findByIdAndUpdate(cat, {$push: {recipes: recipe._id}}, {new: true}, function(err){
        res.status(400).json(err);
      })
    };
    if (Array.isArray(req.body.mealPlan)){
      req.body.mealPlan.map((mealPlan) =>
        MealPlan.findByIdAndUpdate(mealPlan, {$push: {recipes: recipe._id}}, {new: true}, function(err){
          res.status(400).json(err);
        })
      )
    } else if(req.body.ingredients._id){
      MealPlan.findByIdAndUpdate(mealPlan, {$push: {recipes: recipe._id}}, {new: true}, function(err){
        res.status(400).json(err);
      })
    };
    res.json({ recipe });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}




/*----- Helper Functions -----*/
