const { Router } = require('express');
const router = Router();
const token = require('../controllers/imagesCtl');
const userCtl = require('../controllers/userCtl');
// multer config 
const path = require('path')
const multer = require('multer');
const multer_storage = multer.diskStorage({
    destination:path.join(__dirname,'../../public/images'),
    filename:(req,file,cb)=>{
        cb(null, new Date().getTime() + path.extname(file.originalname) );
    }
});

const upload = multer({
    dest: path.join(__dirname,'public/images'),
    storage: multer_storage,
    limits: {fileSize: 1000000} 
})

router.get('/users', userCtl.getAllUsers);
// router.get('/users/noauth', userCtl.getAllUserNoAuth);
router.post('/users/signup',upload.single('image_profile'), userCtl.createNewUser);
router.post('/users/login',  userCtl.logInUser);
router.delete('/users/remove/:id', userCtl.removeUserById);
router.get('/users/profile', token.verifyToken, userCtl.getOwnUser);

module.exports = router;