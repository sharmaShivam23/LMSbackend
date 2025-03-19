const course = require("../model/courseSchema")
const User = require("../model/userSchema")
const Comment = require("../model/commentSchema")

exports.createCourse = async (req,res) => {
  try{

    const {title,description,price,duration,level} = req.body

    if (!title || !description || !price || !duration || !level) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }
    

    const response = await course.create({title,description,price,duration,level})
    res.status(200).json({
      status : true,
      data : response,
      message : "Course created successfully"
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      status : false,
      message : "Error occured while creating course",
      error: error?.message || "Unknown error occurred",
    })
  }
}


exports.getCourses = async (req,res) => {
  try{

    const response = await course.find({})
    res.status(200).json({
      status : true,
      data : response,
      message : "All Courses fetched successfully"
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      status : false,
      message : "Error occured while fetching courses",
      error : error.message
    })
  }
}


exports.getCourseById = async (req,res) => {
  try{
    const response = await course.findById(req.params.id)
    res.status(200).json({
      status : true,
      data : response,
      message : `course fetched successfully` 
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      status : false,
      message : "course not found",
      error : error.message
    })
  }
}


exports.updateCourseById = async (req,res) => {
  try{
    const {title , price } = req.body
    const {id} = req.params
    const response = await course.findByIdAndUpdate(id , {title , price } ,{new : true})
    res.status(200).json({
      status : true,
      data : response,
      message : `course with id : ${id} updated successfully` 
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      status : false,
      message : "Error occured while updating course",
      error : error.message
    })
  }
}


exports.deleteCourseById = async (req,res) => {
  try{
    const {id} = req.params
    const response = await course.findByIdAndDelete(id)
    res.status(200).json({
      status : true,
      data : response,
      message : `course with id : ${id} deleted successfully` 
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      status : false,
      message : "Error occured while deleting course",
      error : error.message
    })
  }
}