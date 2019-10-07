const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  index,
  // edit,
  update,
  show,
  delete :deleteUser
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
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  await User.findById(req.params.id, function(err, user){
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    try {
      user.save();
      res.json({ user });
    } catch(err) {
      res.status(400).json(err);
    }
  });
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


async function deleteUser(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id, function(err, user) {
      res.json({ user });
  });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function signup(req, res) {
  console.log(req.body);
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