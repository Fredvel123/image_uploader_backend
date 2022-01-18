const { Schema, model } = require('mongoose');

const imagesSchema = new Schema({
  image: {
    required: true,
    type: String
  },
  author: {
    required: true,
    type: String,
  },
  public_id: String
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('images', imagesSchema);