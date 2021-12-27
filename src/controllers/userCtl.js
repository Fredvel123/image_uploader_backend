const Users = require('../models/usersScheme');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      } )
  }
}


getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.json(users)
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
  removeUserById
}