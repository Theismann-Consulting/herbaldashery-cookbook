const Ingredient = require('../models/ingredient');

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
