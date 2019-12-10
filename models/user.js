const mongoose = require('mongoose');
<<<<<<< HEAD

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    avatar: String,
    googleId: String,
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

=======
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, required: true, lowercase: true, unique: true},
  password: String,
  role: {
    type: String,
    enum: ['User', 'Contributor', 'Admin'],
  },
  avatar: String,
  googleId: String,
  active: {
      type: Boolean,
      default: true,
  },
  mealPlansOwned: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealPlan',
    }],
  mealPlansAssigned: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealPlan',
    }],
  }, {
  timestamps: true
  });

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};

>>>>>>> 003a2aef4995c9181147a526bb0f2dbfed1da5c0
module.exports = mongoose.model('User', userSchema);