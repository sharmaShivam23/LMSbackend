const User = require('../model/userSchema')
const Course = require('../model/courseSchema')
const Comment = require('../model/commentSchema')


exports.commentedStudent = async (req, res) => {
  try{
    const {userId , courseId , comment} = req.body
    const existUser = await User.findById(userId)
    const existCourse = await Course.findById(courseId)
    if(!existCourse){
      return res.status(404).json({
        status : false,
        message : "Course not found"
      })
    }
    if(!existUser){
      return res.status(400).json({
        status : false,
        message : "User not found"
      })
    }
   if(!comment){
    return res.status(400).json({
      status : false,
      message : "Comment is required"
    })
   }
   const createComment = await Comment.create({userId , courseId , comment})
   const response = await Course.findByIdAndUpdate(courseId , {$push : {Comments : createComment._id}} , {new : true}).populate("Comments").exec()
    res.status(200).json({
      status : true,
      data : {
        name : existUser.name,
        email : existUser.email,
        comment : createComment.comment,
        course : existCourse.title
      },
      message : `Commented successfully`
    }
  )
  }catch(error){
    console.log(error);
    res.status(500).json({
      status : false,
      err : error.message,
      message : `Error while commenting the course`
    })
    
  }
}