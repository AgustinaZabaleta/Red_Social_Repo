const errorLogger = (err, req, res, next) => {
  console.error('\x1b[31m', err); // agregar color rojo a nuestro log
  next(err); // pasamos al siguiente middleware
};

const errorHandler = (err, req, res, next) => {
  // 1 Armamos la respuesta del error general
  let error = null;
  if (err.errors) {
    error = err.errors;
  } else if (err.message) {
    error = err.message;
  } else {
    error = err;
  }

  return res
    .header('Content-Type', 'application/json')
    .status(err.statusCode || 500)
    .json({
      status: err.statusCode || 500,
      message: error,
      error: 'Uups..!!! Por favor contacta al administrador',
      data: null,
    });
};

module.exports = { errorLogger, errorHandler };
