const router = require('express').Router();
// controllers
const userController = require('../controllers/user.controller');
// middlewares
const { validID } = require('../middlewares/validID');
const { validateRequest } = require('../middlewares/authenticated');

router.get('/', userController.getAll);
router.get('/:id', validID, userController.getOne);
router.put('/:id', validateRequest, validID, userController.updateOne);
router.delete('/:id', validateRequest, validID, userController.deleteOne);

module.exports = router;
