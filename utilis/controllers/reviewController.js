const Review = require('../models/ReviewModel');
const factory = require('./factoryHandler');

// exports.getAllReviews = async (req, res) => {
//   try {
//     // nested get review code
//     let filter = {};
//     if (req.params.tourId) filter = { tour: req.params.tourId };
//     const reviews = await Review.find(filter);
//     //
//     res.status(200).json({ data: reviews.length, reviews });
//   } catch (error) {
//     res.status(401).json({ error });
//   }
// };

exports.getAllReviews = factory.getAllDocuments(Review);

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  next();
  // if (!req.body.user) req.body.tour = req.user.id;
};

exports.createReview = factory.createOne(Review);
exports.getOneReview = factory.getOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
