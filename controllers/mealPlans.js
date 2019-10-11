const MealPlan = require('../models/mealPlan');
const User = require('../models/user');
const Recipe = require('../models/recipe');

module.exports = {
  create,
  index,
  update,
  show,
  delete :deleteMealPlan
};


async function index(req, res, next) {
  try {
    await MealPlan.find({}, function (err, mealPlans){
      res.json({ mealPlans });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function show(req, res) {
  try {
    await MealPlan.findById(req.params.id)
      .populate('recipes')
      .populate('assignedUsers')
      .exec(
        function(err, mealPlan) {
          console.log(mealPlan);
        res.json({ mealPlan });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await MealPlan.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, mealPlan){
      req.body.assignedUsers.forEach(function(u){
        User.findByIdAndUpdate(u, {$push: {mealPlansAssigned: mealPlan._id}}, {new: true}, function(err, i){
        });
      });
      req.body.recipes.forEach(function(r){
        Recipe.findByIdAndUpdate(r, {$push: {mealPlans: mealPlan._id}}, {new: true}, function(err, r){
        });
      });
      res.json({ mealPlan });
    })
  } catch (err) {
      res.status(400).json(err);
  }
}

async function deleteMealPlan(req, res, next) {
  try {
    await MealPlan.findByIdAndDelete(req.params.id, function(err, mealPlan) {
      res.json({ mealPlan });
  });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function create(req, res) {
  const mealPlan = new MealPlan(req.body);
  mealPlan.contributor = req.user;
  try {
    await mealPlan.save();
    res.json({ mealPlan });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}




/*----- Helper Functions -----*/
