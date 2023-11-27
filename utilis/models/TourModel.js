const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      /** validation */
      required: true,
      maxLength: [40, 'a Tour name cannot excide 40 character'],
      minLength: [10, 'a Tour name cannot be below 10 character']
    },
    slug: String,
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
    difficulty: {
      type: String,
      // *validations
      required: [true, 'A tour must have a difficulty level'],
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: 'Difficulty level can only either be easy,medium or hard'
      }
    },
    price: {
      type: Number,
      required: true
    },
    summary: {
      type: String,
      required: [true, 'A trip must have a summary'],
      trim: true
    },
    description: {
      type: String,
      trim: true
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
    secretTour: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE this is  a middleware that runs before .save(),.create() methods
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERRY MIDDLEWARE this middleware is ran before returning the find ethod. this is how it works
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
