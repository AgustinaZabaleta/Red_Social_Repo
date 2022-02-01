const { verifyToken } = require('../utils/jwt');

async function validateRequest(req, res, next) {
  try {
    // 1 Checkeamos el token recibido en la cabecera de la solicitud
    const auth = req.headers['authorization'];
    const token = auth?.replace('Bearer ', '');
    // 2 Comprobamos que existe antes de verificar
    if (!token)
      return res.status(403).send({
        data: [],
        status: 403,
        error: 'InvalidToken!',
        message: 'imposible procesar la solicitud',
      });
    // 2 Verificamos si aun es valido
    const tokenValid = await verifyToken(token);

    if (tokenValid) {
      req.user = tokenValid;
      next();
    }
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
