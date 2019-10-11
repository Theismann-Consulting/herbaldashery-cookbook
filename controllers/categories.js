const Category = require('../models/category');

module.exports = {
  create,
  index,
  update,
  show,
  delete :deleteCategory
};


async function index(req, res, next) {
  try {
    await Category.find({}, function (err, categories){
      res.json({ categories });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function show(req, res) {
  try {
    await Category.findById(req.params.id)
      .populate('recipes')
      .exec(
        function(err, category) {
          res.json({ category });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, category){
      res.json({ category });
    })
  } catch (err) {
      res.status(400).json(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await Category.findByIdAndDelete(req.params.id, function(err, category) {
      res.json({ category });
  });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function create(req, res) {
  const category = new Category(req.body);
  category.contributor = req.user;
  try {
    await category.save();
    res.json({ category });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}




/*----- Helper Functions -----*/
