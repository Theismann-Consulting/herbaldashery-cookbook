const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/categories');

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/

// router.use(require('../../config/auth'));

router.get('/', categoriesCtrl.index);
// router.get('/new', categoriesCtrl.new);
router.get('/:id', categoriesCtrl.show);
// router.get('/:id/edit', categoriesCtrl.edit);
// router.get('/:id/users', categoriesCtrl.showUsers);
// router.post('/', categoriesCtrl.create);
// router.post('/:id/recipes', categoriesCtrl.addRecipe);
// router.post('/:id/users', categoriesCtrl.addUser);
// router.put('/:id', categoriesCtrl.update);
// router.delete('/:id', categoriesCtrl.delete);
// router.delete('/:id/recipes/', categoriesCtrl.removeRecipe);
// router.delete('/:id/users', categoriesCtrl.removeUser);


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