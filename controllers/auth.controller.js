const User = require('../models/user.model');
const { createToken } = require('../utils/jwt');

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    // 1 checkear que no esten vacios
    if (!email || !password) throw new Error('Email y Contraseña son necesarios');

    // 2 check if email exists
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email y/o Contraseña Incorrectos');

    // 3 check password with method in instance model user "validPassword"
    const equalPass = await user.comparePassword(password);
    if (!equalPass) throw new Error('Email y/o Contraseña Incorrectos');

    // 4 create token to front session
    const token = await createToken({ id: user._id, email: user.email });

    // 4 check values to response
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    // 1 Checkear que no esten vacios
    if (!name || !email || !password) throw new Error('Todos los campos son necesarios');

    // 2 Checkear si el email ya esta registrado (igual tenemos condicion en el modelo USer)
    const existsEmail = await User.findOne({ email });
    if (existsEmail)
      throw new Error('Ya se encuentra un usuario con las mismas credenciales'); // tambien lo valida el model

    // 3 Creamos un nuevo objeto con los datos del usuario
    const user = new User({ name, email, password });

    // 4 La encriptacion del pass lo hacemos en el model User antes de guardar/crear
    // 5 Guardamos el nuevo usuario
    const newUser = await user.save();
    if (!newUser) throw new Error('Error al procesar la solicitud');

    res.status(200).json({ message: 'Creado Exitosamente', user: newUser });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {}

module.exports = {
  login,
  register,
  logout,
};
