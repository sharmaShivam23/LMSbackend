const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
   description : {
    type : String,
    required : true
   },
    price : {
      type : Number,
      required : true
    },
    duration : {
      type : Number,
      required : true
    },
    level : {
      type : String,
      enum : ["Beginner","Intermediate","Advanced"],
    },
    enrollStudents : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    }],
    Likes : [{
       type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    }],
    Comments : [{
       type : mongoose.Schema.Types.ObjectId,
      ref : "comments"
    }]
})

const course = mongoose.model("courses" , courseSchema)
module.exports = course



