const { Router } = require('express');
const router = Router();
const userCtl = require('../controllers/userCtl');

router.get('/users', userCtl.getAllUsers);
router.post('/signup', userCtl.createNewUser);
router.delete('/remove/:id', userCtl.removeUserById)


module.exports = router;
