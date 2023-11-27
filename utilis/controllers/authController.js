const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    //the JWT works using payload,secret and expires in to create a signature that will be used to be compared with what the user will login using
    // in this case below
    // payload = id: newUser
    // secret = process.env.JWT_SECRET
    // expiresIn = process.env.EXPIRES_IN

    const token = signToken(newUser._id);

    res.status(201).json({ msg: 'success', newUser, token });
    next();
  } catch (error) {
    res.status(401).json({ msg: 'bad request' });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exist
  if (!email || !password) {
    return next(Error('Email/password not found'));
  }

  // 2. Check if user exists && password is correct
  const user = await User.findOne({ email }).select('password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(Error('Unauthorized'));
  }

  // 3. Create a token
  const token = signToken(user._id);

  res.status(200).json({ msg: 'Success', token });
};
