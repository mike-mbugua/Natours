const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name']
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    validate: [validator.isEmail, 'please provide a valid email']
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
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
