const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// const URI_DB = `mongodb://localhost:27017/image_uploader_db`
const URI_DB = `mongodb+srv://freddy:${process.env.KEY_MDB}@cluster0.qklvm.mongodb.net/image_uploader_db?retryWrites=true&w=majority`
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(URI_DB, config)
  .then(da => console.log("the database is connected :)"))
  .catch(err => console.log(err))
