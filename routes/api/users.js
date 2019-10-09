const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.post('/login', usersCtrl.login);

/*---------- Protected Routes ----------*/

// router.use(require('../../config/auth'));

router.post('/signup', usersCtrl.signup);
router.get('/', usersCtrl.index);
router.get('/:id', usersCtrl.show);
router.put('/:id', usersCtrl.update);
router.delete('/:id', usersCtrl.delete);

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