const mongoose = require('mongoose');

module.exports.validID = (req, _, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new Error('Identificador Invalido'));
  }
  next();
};
