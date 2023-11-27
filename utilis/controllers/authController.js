const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

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

    const token = jwt.sign({ id: newUser }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN
    });

    res.status(201).json({ msg: 'success', newUser, token });
  } catch (error) {
    res.status(401).json({ msg: 'bad request' });
  }
};
