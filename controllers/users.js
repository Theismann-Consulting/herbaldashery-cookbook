const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  index,
  // edit,
  // update,
  show,
  // delete :deleteUser
};


async function index(req, res, next) {
  try {
    await User.find({}, function (err, users){
        res.json({ users });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function show(req, res) {
  try {
    await User.findById(req.params.id, function(err, user) {
        res.json({ user });
        console.log('Controller:', user);
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

// function newUser(req, res) {
//   res.render('users/add', {
//       contributor: req.user,
//     });
// }

// function create(req, res, next){
//   const user = new User(req.body);
//   user.save(function(err) {
//       if (err) {return res.render('users/new', {
//           contributor: req.user
//       })};
//       if (req.isAuthenticated()){
//         res.redirect('/users');
//       } else {
//         res.redirect('/');
//       }
//   });
// };

// function edit(req, res){
//   User.findById({ _id: req.params.id }, function(err, user){
//     res.render('users/edit', {
//       user,
//       contributor: req.user,
//     });
//   });
// }

// function update(req, res) {
//   console.log(req.body);
//   User.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, user){
//       res.redirect(`/users/${user._id}`);
//   });
// };

// function deleteUser(req, res, next) {
//   User.findByIdAndDelete(req.params.id, function(err) {
//       res.redirect('/users');
//   });
// };

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}