const User = require('../models/UserModel');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ msg: 'success', newUser });
  } catch (error) {
    res.status(401).json({ msg: 'bad request' });
  }
};
