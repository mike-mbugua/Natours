class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // // FILTERING
  // const queryObj = { ...req.query }; // Use req.query for querying parameters
  // const excludedFields = ['page', 'sort', 'limit', 'fields'];
  // excludedFields.forEach(el => delete queryObj[el]);

  // // ADVANCED FILTERING
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  // let query = Tour.find(JSON.parse(queryStr));

  // pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;

  // query = query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const numOfTours = await Tour.countDocuments();
  //   if (skip >= numOfTours) throw new Error('This page has no data');
  // }

  // Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort('-createdAt');
  // }

  // // FIELDS
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');

  //   query = query.select(fields);
  // } else {
  //   query.select('-__v');
  // }

  filter() {
    // FILTERING
    const queryObj = { ...this.queryString }; // Use req.query for querying parameters
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  sort() {
    // Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limit() {
    // FIELDS
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');

      this.query = this.query.select(fields);
    } else {
      this.query.select('-__v');
    }
    return this;
  }
}
module.exports = APIFeatures;
