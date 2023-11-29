const Tour = require('../models/TourModel');
const APIFeatures = require('../apiFeatures');
const factory = require('./factoryHandler');

exports.topAlias = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Execute the query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .paginate()
      .sort()
      .limit();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('reviews');
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(401).json({ Error: error });
  }
};

exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
