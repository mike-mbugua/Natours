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
