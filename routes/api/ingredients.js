const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../controllers/ingredients');

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/

// router.use(require('../../config/auth'));

// router.post('/', ingredientsCtrl.create);
// router.put('/:id', ingredientsCtrl.update)
// router.delete('/:id', ingredientsCtrl.delete);

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