const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  duration: Number,
  maxGroupSize: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: true
  },
  summary: {
    type: String,
    required: [true, 'A trip must have a summary']
  },
  description: {
    type: String
  },
  imageCover: {
    type: String,
    required: [true, 'Please provide tour cover']
  },
  images: {
    type: [String]
  },
  startDates: {
    type: [Date]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
