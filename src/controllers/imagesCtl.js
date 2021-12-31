const Users = require('../models/usersScheme');
const Images = require('../models/imagesScheme');
const jwt = require('jsonwebtoken');

const addNewImage = async (req, res) => {
  const token = req.headers['access-token'];
  if(token) {
    jwt.verify(token, process.env.KEY_JWT, async(err, payload) => {
    if(err) {
      res.json({
        isLogged: false,
        message: "your token is not valid"
      })
    } else {
        const image = new Images(req.body);
        const newImage = await image.save();
        res.json(newImage)
      }
    });
  } else {
    res.json({
      status: 404,
      message: "you don't have access here, you need a token"
  })
  }  
  
  
}


const yourImages = (req, res) => {
  const token = req.headers['access-token'];
  if(token) {
    jwt.verify(token, process.env.KEY_JWT, async(err, payload) => {
    if(err) {
      res.json({
        isLogged: false,
        message: "your token is not valid"
      })
    } else {
        const images = await Images.find({_id: payload.id});
        if(images) {
          res.json(images);
        } else {
          res.json({
            isLogged: true,
            message: "you still don't have images added, you can images in the button bellow"
          })
        }
      }
    });
  } else {
    res.json({
      status: 404,
      message: "you don't have access here, you need a token"
  })
  }  
} 

const removeImageById = async (req, res) => {
  const token = req.headers['access-token'];
  if(token) {
    jwt.verify(token, process.env.KEY_JWT, async(err, payload) => {
    if(err) {
      res.json({
        isLogged: false,
        message: "your token is not valid"
      })
    } else {
        const {id} = req.params;
        const images = await Images.findByIdAndDelete(id);
        res.json({
          isRemoved: true,
          message: "the image was removed"
        })
      }
    });
  } else {
    res.json({
      status: 404,
      message: "you don't have access here, you need a token"
  })
  }    
}

const getAllImages = async (req, res) => {
  const users = await Images.find()
  res.json(users);
}

module.exports = {
  yourImages,
  addNewImage,
  removeImageById,
  getAllImages
}