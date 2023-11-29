const APIFeatures = require('../apiFeatures');

exports.deleteOne = Model => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next('There is no Document with that id');

    res.status(204).json({
      status: 'success',
      data: null,
      message: 'Document deletion successful'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateOne = Model => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: doc
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.createOne = Model => async (req, res) => {
  // console.log(req.body);
  try {
    const doc = await Model.create(req.body);

    res.status(201).json({ data: doc });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.getAllDocuments = Model => async (req, res) => {
  try {
    // Execute the query
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .paginate()
      .sort()
      .limit();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = (Model, popOptions) => async (req, res) => {
  try {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  } catch (error) {
    res.status(401).json({ Error: error });
  }
};
