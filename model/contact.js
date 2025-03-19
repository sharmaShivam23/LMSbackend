const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
   email : {
    type : String,
    required : true
   },
   phoneno  : {
    type : String,
    required : true
   },
   message : {
    type : String
   }
})

module.exports = mongoose.model("contact" , contactSchema)