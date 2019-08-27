const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);

router.get('/new', isContributor, recipesCtrl.new);
router.get('/:id', recipesCtrl.show);
router.get('/:id/edit', recipesCtrl.edit)

router.post('/', recipesCtrl.create);
router.put('/:id', recipesCtrl.update)

router.delete('/:id', recipesCtrl.delete);

function isLoggedIn(req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

function isAdmin(req, res, next) {
    console.log(req.user);
    if (req.user.role === 'Admin') return next();
    res.redirect('/recipes');
}

function isContributor(req, res, next) {
    console.log(req.user);
    if (req.user.role === 'Contributor' || req.user.role === 'Admin') return next();
    res.redirect('/recipes');
}
module.exports = router;