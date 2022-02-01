const express = require('express');
const routes = require('./routes');
const { errorLogger, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// para parsear data en json
app.use(express.json());

// rutas
app.use('/api', routes);

// resolucion rutas no asignadas
app.get('*', function (req, res, next) {
  const error = new Error('Error Recurso no Encontrado');
  error.statusCode = 404;
  next(error);
});

// middleware
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
