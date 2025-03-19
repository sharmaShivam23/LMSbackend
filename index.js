const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json())

//routes
const routes = require("./routes/Routes")
app.use("/api/lms" , routes) 

//db connection
const database = require('./config/database')
console.log(database);
database()

PORT = process.env.PORT
app.listen(PORT , () => {
  console.log(`Project successfully running on ${PORT}`);
})


