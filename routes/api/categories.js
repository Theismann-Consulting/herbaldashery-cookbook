const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/categories');

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/

router.use(require('../../config/auth'));

router.get('/', isLoggedIn, categoriesCtrl.index);
router.get('/:id', isLoggedIn, categoriesCtrl.show);
router.post('/', isContributor, isAdmin, categoriesCtrl.create);
router.put('/:id', isContributor, isAdmin, categoriesCtrl.update);
router.delete('/:id', isAdmin, categoriesCtrl.delete);



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