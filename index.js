const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json())

//fileupload
const fileUpload = require('express-fileupload')
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}))


//routes
const routes = require("./routes/Routes")
app.use("/api/lms" , routes) 

//db connection
const database = require('./config/database')
console.log(database);
database()

//cloudinary

const {cloudinaryConnect} = require('./config/cloudinary')
cloudinaryConnect()

PORT = process.env.PORT
app.listen(PORT , () => {
  console.log(`Project successfully running on ${PORT}`);
})


