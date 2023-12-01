const express = require('express');
const tourController = require('./../controllers/tourController');
const reviewRouter = require('./../routes/reviewRoutes');
const authController = require('./../controllers/authController');

const router = express.Router();

// nested routes
// this happens when there is a connection between a parent and a child, it should be in the parents routes
// in this case implementing for tour as the parent to the reviews

// so instead of  nesting as below we will be repeating our own code that is in review router,The best option will be to use merge params

// router.route('/:tourId/reviews').post(reviewController.createReview);

// instead use this as mounting router
// then in the review route make sure to add mergeParams as true
router.use('/:tourId/reviews', reviewRouter);

// router.param('id', tourController.checkID);
router
  .route('/top-5-cheap')
  .get(tourController.topAlias, tourController.getAllTours);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
