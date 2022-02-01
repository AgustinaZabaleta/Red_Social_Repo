const express = require('express');
const { errorHandler } = require('./utils/errorHandler');
const app = express();

// para parsear data en json
app.use(express.json());

// rutas
const userRoutes = require('./routes/user');

// base rutas
app.use('/api', userRoutes);
// resolucion rutas no asignadas
app.get('*', function (req, res, next) {
  const error = new Error('Error de sistema');
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

module.exports = app;
