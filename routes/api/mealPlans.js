const express = require('express');
const router = express.Router();
const mealPlansCtrl = require('../../controllers/mealPlans');

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/

router.use(require('../../config/auth'));

router.get('/', isLoggedIn, mealPlansCtrl.index);
router.get('/:id', isLoggedIn, mealPlansCtrl.show);
router.post('/', isContributor, isAdmin, mealPlansCtrl.create);
router.put('/:id', isContributor, isAdmin, mealPlansCtrl.update);
router.delete('/:id', isAdmin, mealPlansCtrl.delete);



/*----- Helper Functions -----*/

function isLoggedIn(req, res, next) {
  if (req.user) return next();
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