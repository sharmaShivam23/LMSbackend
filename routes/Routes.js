const express = require('express')
const router = express.Router()

const {signUp} = require("../controllers/userAuth")
const {signIn} = require("../controllers/userAuth")
const {createCourse} = require("../controllers/course")
const {getCourses} = require("../controllers/course")
const {getCourseById} = require("../controllers/course")
const {updateCourseById} = require("../controllers/course")
const {deleteCourseById} = require("../controllers/course")
const {enrollStudents} = require("../controllers/enrollStudents")
const {likedUser} = require("../controllers/likedStudents")
const {unlikedUser} = require("../controllers/likedStudents")
const {commentedStudent } = require("../controllers/commentStudent")
const {contact} = require("../controllers/contact")


router.post("/signUp",signUp)
router.post("/signIn",signIn)
router.post("/createCourse",createCourse)
router.get("/getCourses",getCourses)
router.get("/getCourseById/:id",getCourseById)
router.put("/updateCourseById/:id",updateCourseById)
router.delete("/deleteCourseById/:id",deleteCourseById)
router.post("/enrollStudents",enrollStudents)
router.post("/likedUser",likedUser)
router.post("/unlikedUser",unlikedUser)
router.post("/commentedStudent",commentedStudent)
router.post("/contact",contact)


module.exports = router


