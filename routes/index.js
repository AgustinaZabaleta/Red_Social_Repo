const router = require('express').Router();
const authRouter = require('./auth.router');
const userRouter = require('./user.router');

const defaultRoutes = [
  { path: '/auth', route: authRouter },
  { path: '/users', route: userRouter },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
