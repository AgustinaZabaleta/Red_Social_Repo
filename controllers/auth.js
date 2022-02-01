async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw 'Email y Contraseña son necesarios';

    const user = await User.findOne({ email });
    const equalPass = await user.comparePassword(password);

    if (!equalPass) throw 'Password no coincide';

    user.logged_in = true;
    await user.save();

    // creamos el jwt
    const token = await jwt.createToken(user);

    res.status(200).send({ token, user });
  } catch (error) {
    next(new Error(error));
  }
}

async function logout(req, res, next) {}

async function register(req, res, next) {
  const { email, password } = req.body;
  const user = new User({ email, password });

  try {
    if (!email) throw 'Email es necesario';
    if (!password) throw 'Password es necesario';

    const existsEmail = await User.findOne({ email });
    if (existsEmail) throw 'Email ya esta en uso';

    // const pass = await generateHash(password);
    const newUser = await user.save();

    return !newUser
      ? next(new Error('Error al procesar la solicitud'))
      : res.status(200).send({ msg: 'Creado Exitosamente', data: newUser });
  } catch (error) {
    next(new Error(error));
  }
}

module.exports = {
  login,
  register,
  logout,
};
