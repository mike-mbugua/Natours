const User = require('../models/UserModel');
const factory = require('./factoryHandler');

exports.getAllUsers = factory.getAllDocuments(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

// use the sign up

// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!'
//   });
// };
