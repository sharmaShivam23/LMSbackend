const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
  },
  phoneno : {
    type : Number,
    required : true
  },
  dob : {
    type : Date,
  },
  password : {
    type : String,
    required : true
  }
})

module.exports = mongoose.model("User" , userSchema)



// unique: true,
// match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]