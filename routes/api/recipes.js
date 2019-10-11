const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/recipes');
const ingredientsCtrl = require('../../controllers/ingredients');

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/

router.use(require('../../config/auth'));

router.get('/', isLoggedIn, recipesCtrl.index);
router.get('/:id', isLoggedIn, recipesCtrl.show);
router.post('/', isContributor, isAdmin, recipesCtrl.create);
router.put('/:id', isContributor, isAdmin, recipesCtrl.update);
router.delete('/:id', isLoggedIn, recipesCtrl.delete);


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