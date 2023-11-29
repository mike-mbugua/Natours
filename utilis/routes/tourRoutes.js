const express = require('express');
const tourController = require('./../controllers/tourController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

// router.param('id', tourController.checkID);
router
  .route('/top-5-cheap')
  .get(tourController.topAlias, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// nested routes
// this happens when there is a connection between a parent and a child, it should be in the parents routes
// in this case implementing for tour as the parent to the reviews

router.route('/:tourId/reviews').post(reviewController.createReview);

module.exports = router;
