const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const ingredientsCtrl = require('../controllers/ingredients');

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/

// router.use(require('../../config/auth'));

// router.get('/', recipesCtrl.index);
// router.get('/new', recipesCtrl.new);
// router.get('/:id', recipesCtrl.show);
// router.get('/:id/edit', recipesCtrl.edit);
// router.post('/', recipesCtrl.create);
// router.put('/:id', recipesCtrl.update);
// router.delete('/:id', recipesCtrl.delete, ingredientsCtrl.clean);


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