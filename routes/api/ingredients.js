const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../../controllers/ingredients');

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/

router.use(require('../../config/auth'));

router.post('/', isContributor, isAdmin, ingredientsCtrl.create);
router.get('/', isLoggedIn, ingredientsCtrl.index);
router.get('/:id', isLoggedIn, ingredientsCtrl.show);
router.put('/:id', isContributor, isAdmin, ingredientsCtrl.update)
router.delete('/:id', isAdmin, ingredientsCtrl.delete);

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