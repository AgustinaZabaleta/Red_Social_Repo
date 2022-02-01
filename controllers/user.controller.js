const User = require('../models/user.model');

async function getAll(req, res, next) {
  try {
    const users = await User.find().select('-password');
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
}

async function getOne(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) throw new Error('No se encontraron resultados');

    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req, res, next) {
  try {
    // 1 TODO: Checkear data antes de guardar
    // 2 Buscar el id y guardar cambios
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true, // pasa las validaciones (except pass validarlo aparte)
      new: true, // devuelve la data modificada
    });
    if (!userUpdated) throw new Error('No se encontraron resultados');

    res.status(200).json({ user: userUpdated });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req, res, next) {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id, {
      new: true, // devuelve la data eliminado
    });
    if (!userDeleted) throw new Error('No se encontraron resultados');

    res.status(200).json({ user: userDeleted });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
