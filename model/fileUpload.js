const mongoose = require('mongoose')

const fileUploadSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  instaLink : {
    type : String,
    required : true
  },
  githubLink : {
    type : String,
    required : true
  },
  imageURL : {
    type : String,
    required : true
  }
})

module.exports = mongoose.model("files" , fileUploadSchema)