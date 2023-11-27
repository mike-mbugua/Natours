const User = require('../models/UserModel');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });
    res.status(201).json({ msg: 'success', newUser });
  } catch (error) {
    res.status(401).json({ msg: 'bad request' });
  }
};
