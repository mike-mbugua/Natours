const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../models/TourModel');

dotenv.config({ path: './../config.env' });
const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`database connected`));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

// to import data to database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log(`data imported`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// delete existing data

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log(`data deleted successfully`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
