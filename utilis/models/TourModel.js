const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./UserModel');

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
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty level can only either be easy,medium or hard'
      }
    },
    price: {
      type: Number,
      required: true
    },
    priceDiscount: {
      type: Number,
      // Custom validations
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'The discount ({VALUE}) cannot be greater than price'
      }
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
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      description: String,
      coordinates: [Number],
      address: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    secretTour: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    // in embedding you just define the data to be embedded as below
    // guides: Array

    // But for referencing here is how its done
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User' /**this is the model you are refering to */
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Embedding guides to the tour schema
// set the guides in the schema without any data just an empty array.
// then import the model you want to embedd
// then run the code below to embedd the data defore saving the data to the DB

// tourSchema.pre('save', async function(next) {
//   const guidePromise = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidePromise);
//   next();
// });

// DOCUMENT MIDDLEWARE this is  a middleware that runs before .save(),.create() methods
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// to populate referenced data we can used a document middleware. here is how
tourSchema.pre(/^find/, function(next) {
  this.populate('guides');
  next();
});

// QUERRY MIDDLEWARE this middleware is ran before returning the find ethod. this is how it works
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
