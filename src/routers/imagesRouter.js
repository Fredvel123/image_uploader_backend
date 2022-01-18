const { Router } = require('express');
const router = Router();
const imageCtl = require('../controllers/imagesCtl');
// code to multer
const path = require('path')
const multer = require('multer');
const multer_storage = multer.diskStorage({
    destination:path.join(__dirname,'../../public/images'),
    filename:(req,file,cb)=>{
        cb(null, new Date().getTime() + path.extname(file.originalname) );
    }
});

const upload = multer({
    dest:path.join(__dirname,'public/images'),
    storage:multer_storage,
    limits: {fileSize: 1000000}  
})

router.get('/images/all', imageCtl.getAllImages);
router.get('/images', imageCtl.verifyToken ,imageCtl.yourImages);
router.post('/images/add', imageCtl.verifyToken, upload.single('image'), imageCtl.addNewImage);
router.get('/images/remove/:id', imageCtl.verifyToken, imageCtl.removeImageById);

module.exports = router;