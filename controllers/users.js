const User = require('../models/user');
const MealPlan = require('../models/mealPlan');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  index,
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
    await User.findById(req.params.id)
      .populate('MealPlan')
      .exec(function(err, user) {
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
    if(req.body.user > 0){user.password = req.body.password;}
    user.role = req.body.role;
    try {
      user.save();
      res.json({ user });
    } catch(err) {
      res.status(400).json(err);
    }
  });
};

async function deleteUser(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id, function(err, user) {
      MealPlan.findOneAndUpdate({assignedUsers: user._id}, {$pull: {assignedUsers: user._id}}, function(err, mealPlan){
        res.json({ user, mealPlan });
      });
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