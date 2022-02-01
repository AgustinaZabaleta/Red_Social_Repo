const router = require('express').Router();
// controller
const userController = require('../controllers/user');

// middlewares
// const { validID } = require('../utils/helpers');
const { validateRequest } = require('../middlewares/authenticated');

// rutas autenticacion
router.post('/login', userController.login);
router.post('/register', userController.register);
// router.get('/logout', userController.logout);

// rutas usuario
router.get('/user', validateRequest, userController.getAll);
// router.get('/user/:id', validateRequest, validID, userController.getOne);

module.exports = router;
