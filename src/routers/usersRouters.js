const { Router } = require('express');
const router = Router();
const userCtl = require('../controllers/userCtl');

router.get('/users', userCtl.getAllUsers);
router.post('/users/signup', userCtl.createNewUser);
router.post('/users/login', userCtl.logInUser);
router.delete('/users/remove/:id', userCtl.removeUserById);

router.get('/users/profile', userCtl.getOwnUser);


module.exports = router;
