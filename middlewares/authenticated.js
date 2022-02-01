const { verifyToken } = require('../utils/jwt');

async function validateRequest(req, res, next) {
  try {
    const auth = req.headers['authorization'];
    const token = auth?.replace('Bearer ', '');
    // comprobamos que hay un token antes de verificar
    if (!token)
      return res.status(403).send({
        data: [],
        status: 403,
        error: 'InvalidToken!',
        message: 'imposible procesar la solicitud',
      });
    // verificamos (si devuelve true continuamos)
    const store = await verifyToken(token);
    if (store) next();
  } catch (error) {
    return res.status(401).send({
      data: [],
      message: 'Tus sesión ha expirado, volvé a ingresar',
      error: 'Unauthorized! ' + error,
      status: 401,
    });
  }
}

module.exports = {
  validateRequest,
};
