const express = require('express');
const router = express.Router();
const mealPlansCtrl = require('../../controllers/mealPlans');

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/

// router.use(require('../../config/auth'));

router.get('/', mealPlansCtrl.index);
router.get('/:id', mealPlansCtrl.show);
// router.get('/:id/users', mealPlansCtrl.showUsers);
router.post('/', mealPlansCtrl.create);
// router.post('/:id/recipes', mealPlansCtrl.addRecipe);
// router.post('/:id/users', mealPlansCtrl.addUser);
// router.put('/:id', mealPlansCtrl.update);
// router.delete('/:id', mealPlansCtrl.delete);
// router.delete('/:id/recipes/', mealPlansCtrl.removeRecipe);
// router.delete('/:id/users', mealPlansCtrl.removeUser);


/*----- Helper Functions -----*/

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

function isAdmin(req, res, next) {
  if (req.user.role === 'Admin') return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

function isContributor(req, res, next) {
  if (req.user.role === 'Contributor' || req.user.role === 'Admin') return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

module.exports = router;