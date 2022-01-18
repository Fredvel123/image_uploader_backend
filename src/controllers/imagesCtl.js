const Users = require('../models/usersScheme');
const Images = require('../models/imagesScheme');
const jwt = require('jsonwebtoken');
// cloudinary config
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
})
const fs = require('fs-extra');

const verifyToken = (req, res, next) => {
  const token = req.headers['access-token'];
  if(token) {
    jwt.verify(token, process.env.KEY_JWT, async(err, payload) => {
    if(err) {
      res.json({
        isLogged: false,
        message: "your token is not valid"
      })
    } else {
        req.userId = payload.id;
        next() 
      }
    });
  } else {
    res.json({
      status: 404,
      message: "you don't have access here, you need a token"
  })
  } 
}



const addNewImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const image = new Images({
    image: result.secure_url,
    public_id: result.public_id, 
    author: req.userId
  });
  const newImg = await image.save();
  // res.json(newImg)
  await fs.unlink(req.file.path)
  res.json(newImg);
}


const yourImages = async (req, res) => {
  const images = await Images.find({ author: req.userId });
  if (images) {
    res.json(images);
  } else {
    res.json({
      isLogged: true,
      message: "you still don't have images added, you can images in the button bellow"
    })
  }
} 

const removeImageById = async (req, res) => {
  const { id } = req.params;
  const image = await Images.findByIdAndDelete(id);
  await cloudinary.uploader.destroy(image.public_id)
  res.json(image)
}

const getAllImages = async (req, res) => {
  const users = await Images.find()
  res.json(users);
}

module.exports = {
  yourImages,
  addNewImage,
  removeImageById,
  getAllImages,
  verifyToken
}