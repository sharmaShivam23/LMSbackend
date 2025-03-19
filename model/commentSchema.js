const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  courseId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "courses"
  },
  comment : {
    type: String,
    required : true
  }
})

module.exports = mongoose.model("comments" , commentSchema)
