const mongoose = require('mongoose');

const validID = (req, _, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new Error('Identificador Invalido');
  }
  next();
};

module.exports = {
  validID,
};
