const jwt = require('jsonwebtoken');
const config = require('../config');

function createToken({ id, email }, expiresIn = 60 * 60) {
  return new Promise((resolve, reject) => {
    if (!id || !email) {
      reject('datos invalidos');
      return;
    }
    jwt.sign(
      { id, email },
      config.SECRET_KEY,
      {
        // algorithm: 'RS256', // 2024bit
        expiresIn,
      },
      (err, token) => {
        if (err) {
          reject('token invalido');
          return;
        }
        resolve(token);
      }
    );
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject('token invalido');
      return;
    }
    jwt.verify(
      token,
      config.SECRET_KEY,
      {
        // algorithm: 'RS256', // 2024bit
      },
      (err, decode) => {
        if (err) {
          reject('token invalido');
          return;
        }
        resolve(decode);
      }
    );
  });
}

module.exports = {
  createToken,
  verifyToken,
};
