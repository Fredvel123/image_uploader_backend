const Users = require('../models/usersScheme');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();

//  sign up user.
const createNewUser = async (req, res) => {
  const user = new Users(req.body);
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
const getOwnUser = (req, res) => {
  const token = req.headers['access-token'];
  if(token) {
    jwt.verify(token, process.env.KEY_JWT, async(err, payload) => {
      if(err) {
        res.json({
          isLogged: false,
          message: "your token is not valid"
        })
      } else {
        const user = await Users.findOne({_id: payload.id}).select('-password');
        res.json(user)
      }
    });
  } else {
    res.json({
      isLogged: false,
      message: "you don't have access here, you need a token"
    })
  }  
}


// other urls
getAllUsers = async (req, res) => {
  const token = req.headers['access-token'];
  if(token) {
    jwt.verify(token, process.env.KEY_JWT, async(err, paylad) => {
      if(err) {
        res.json({
          isLogged: false,
          message: "your token is not valid"
        })
      } else {
        const users = await Users.find().select('-password').select('-_id');
        res.json(users)
      }
    });
  } else {
    res.json({
      status: 404,
      message: "you don't have access here, you need a token"
    })
  } 
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

// test to token
const testToken = (req, res) => {
  const _token = req.headers['access-token'];
  if(_token) {
    jwt.verify(_token, process.env.KEY_JWT, (err, payload) => {
      if(err) {
        res.json({
          isLogged: false,
          message: "your token is not valid"
        })
      } else {
        res.json({
          isLogged: true,
          message: "your token is valid",
          token: _token
        })
      }
    })
  } else {
    res.json({
      isLogged: false,
      message: "your don't have access here, you need a token"
    })
  }
}

module.exports = {
  getAllUsers, 
  createNewUser, 
  logInUser,
  removeUserById, 
  getOwnUser,
  getAllUserNoAuth,
  testToken
}