const express = require('express');
const reviewController = require('../controllers/reviewController');

// use this to merge the route from tour parent route { mergeParams: true }
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);
module.exports = router;
