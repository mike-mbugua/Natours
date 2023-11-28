const Review = require('../models/ReiewModel');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ data: reviews });
  } catch (error) {
    res.status(401).json({ error });
  }
};

exports.createReview = async (req, res) => {
  try {
    const reviews = await Review.create(req.body);
    res.status(201).json({ data: reviews, message: 'Success' });
  } catch (error) {
    res.status(401).json({ error });
  }
};
