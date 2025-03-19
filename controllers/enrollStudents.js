

const User = require('../model/userSchema');
const enrollSchema = require('../model/enrolledSchema');
const Course = require('../model/courseSchema');

exports.enrollStudents = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    
  
    const existUser = await User.findById(userId);
    if (!existUser) {
      return res.status(400).json({
        status: false,
        message: `User not found`
      });
    }


    const existCourse = await Course.findById(courseId);
    if (!existCourse) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    }

    
    await enrollSchema.create({ courseId, userId });

  
    const enroll = await Course.findByIdAndUpdate(
      courseId,
      { $push: { enrollStudents: userId } },
      { new: true }
    ).populate("enrollStudents").exec();
    console.log(enroll);

    
    res.status(200).json({
      status: true,
      data: {
        name: existUser.name,
        email: existUser.email,
        enrolledCourse: existCourse.title
      },
      message: `User enrolled successfully`
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: `Error occurred while enrolling user`,
      error: error.message
    });
  }
};
