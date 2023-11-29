const User = require('../models/UserModel');
const factory = require('./factoryHandler');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ msg: 'success', data: users });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  }
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = factory.deleteOne(User);
