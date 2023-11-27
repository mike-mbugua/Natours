const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name']
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    validate: [validator.isEmail, 'please provide a valid email'],
    lowercase: true,
    unique: [true, 'Email should be unique']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    minlength: [8, 'Pass word should be more than 8 characters'],
    required: [true, 'Please provide a password']
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function(pass) {
        return pass === this.password;
      },
      message: 'Passwords do not match'
    }
  }
});

userSchema.pre('save', async function(next) {
  // check whether the password has been modified
  if (!this.isModified('password')) return next();

  // if the password has been modified then hash it using cost 12
  this.password = await bcrypt.hash(this.password, 12);

  //after the password confirm has been validated do not store it to the db
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
