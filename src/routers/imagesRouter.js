const { Router } = require('express');
const router = Router();
const imageCtl = require('../controllers/imagesCtl');

router.get('/images/all', imageCtl.getAllImages);
router.get('/images', imageCtl.yourImages);
router.post('/images/add', imageCtl.addNewImage);
router.delete('/images/remove/:id', imageCtl.removeImageById);

module.exports = router;