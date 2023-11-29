const Review = require('../models/ReviewModel');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    // the nested routing
    res.status(200).json({ data: reviews.length, reviews });
  } catch (error) {
    res.status(401).json({ error });
  }
};

exports.createReview = async (req, res) => {
  try {
    if (!req.body.tour) req.body.tour = req.params.tourId;
    const reviews = await Review.create(req.body);
    res.status(201).json({ data: reviews, message: 'Success' });
  } catch (error) {
    res.status(401).json({ error });
  }
};
