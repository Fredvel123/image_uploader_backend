const Users = require('../models/usersScheme');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();
// cloudinary config
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
})
// const fs = require('fs-extra');


//  sign up user.
const createNewUser = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const data = req.body;
  const user = new Users({
    name: data.name,
    email: data.email,
    password: data.password,
    avatar: result.secure_url
  });
  const emailRepeate = await Users.findOne({email: user.email});
  if(emailRepeate) {
    res.json({
      isCreated: false,
      message: `the email: ${user.email} is used now, use a new email`
    })
  } else {
    bcrypt.hash(user.password, 10, async (err, hash) => {
      if(!err) {
        user.password = hash;
        const newUser = await user.save();
        res.json({
          isCreated: true,
          message: `${newUser.name}, your user has been created, now you can logging in the "loggin section"`
        })
      } else {
          res.json({
            isCreated: false,
            message: `${newUser.name}, your user hasn't been created, now you can logging in the "loggin section"`
          })  
        }
      })
  }
}

// log in user
const logInUser = async (req, res) => {
  const user = await Users.findOne({email: req.body.email});
  if(user) {
    bcrypt.compare(req.body.password, user.password, (err, data) => {
      if(data) {
        const token = jwt.sign({id: user._id}, process.env.KEY_JWT, {expiresIn: 1800});
        res.json({
          isLogged: true,
          token: token 
        })
      } else {
        res.json({
          isLogged: false,
          message: "the password is not correct"
        })
      }
    })
  } else {
    res.json({
      isLogged: false,
      message: "the email is not correct"
    })
  } 
}


// code to get your own user
const getOwnUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.userId }).select('-password');
  res.json(user)
}


// other urls
const getAllUsers = async (req, res) => {
  const users = await Users.find().select('-password').select('-_id');
  res.json(users)
}

const getAllUserNoAuth = async (req, res) => {
  const users = await Users.find();
  res.json(users);  
}

const removeUserById = async (req, res) => {
  const {id} = req.params
  const user = await Users.findByIdAndDelete(id);
  res.json({
    message: `the user ${user.name}, was removed successfully`
  })
} 


module.exports = {
  getAllUsers, 
  createNewUser, 
  logInUser,
  removeUserById, 
  getOwnUser,
  getAllUserNoAuth,
}