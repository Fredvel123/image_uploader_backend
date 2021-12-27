const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  }, 
  avatar: {
    required: false,
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('users', userSchema);