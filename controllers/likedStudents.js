
const Course = require("../model/courseSchema")
const User = require("../model/userSchema");


exports.likedUser = async (req, res) => {
  try{

    const {courseId , userId} = req.body
    const existUser = await User.findById(userId)
    const existCourse = await Course.findById(courseId)
    if(!existUser){
      return res.status(400).json({
        status : false,
        message : "User not found"
      })
    }
    if(!existCourse){
      return res.status(404).json({
        status : false,
        message : "Course not found"
      })
    }
    const response = await Course.findByIdAndUpdate(courseId , {$push : {Likes: userId}} , {new : true}).populate("Likes").exec()

    res.status(200).json({
      status : true,
      data : {
        name : existUser.name,
        email : existUser.email,
        likedCourse : existCourse.title
      },
      message : `User liked successfully`
    })

  }catch(err){
    console.log(err);
    res.status(500).json({
      status : false,
      err : err.message,
      message : `Error while liked the course`
    })
  }
}



exports.unlikedUser = async (req, res) => {
  try{

    const {courseId , userId} = req.body
    const existUser = await User.findById(userId)
    const existCourse = await Course.findById(courseId)
    if(!existUser){
      return res.status(400).json({
        status : false,
        message : "User not found"
      })
    }
    if(!existCourse){
      return res.status(404).json({
        status : false,
        message : "Course not found"
      })
    }
    const response = await Course.findByIdAndUpdate(courseId , {$pull : {Likes: userId}} , {new : true})

    res.status(200).json({
      status : true,
      data : {
        name : existUser.name,
        email : existUser.email,
        unlikedCourse : existCourse.title
      },
      message : `course unliked successfully`
    })

  }catch(err){
    console.log(err);
    res.status(500).json({
      status : false,
      err : err.message,
      message : `Error while unliked the course`
    })
  }
}


