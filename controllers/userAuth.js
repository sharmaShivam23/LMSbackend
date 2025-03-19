const user = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../Tools/sendEmail')

exports.signUp = async(req,res) => {
  try{
    const {name , email , password , phoneno , dob} = req.body
    if(!name || !email || !password || !phoneno){
      res.status(400).send({
        success : false,
        message : "All details are required",
      })
    }

    if(name.length <3 || email.length < 3){
      res.status(400).send({
        success : false,
        message : "Details are too short"
      })
    }
    if(password.length < 6 ){
      res.status(400).send({
        success : false,
        message : "Password should be atleast 6 characters longs"
      })
    }
    if(phoneno.length < 10){
      res.status(400).send({
        success : false,
        message : "Phone number should be 10 digits"
      })
    }

    const existEmail = await user.findOne({email})
    if(existEmail){
      return res.status(400).send({
        success : false,
        message : "Email already exist",
      })
    }
   

  let hashpassword;
  try{
   hashpassword = await bcrypt.hash(password , 10)
  }catch(error){
   return res.status(500).send({
      success : false,
      message : "Error occured while hashing password",
      error : error.message
    })
  }

  const userCreate = await user.create({name , email ,password : hashpassword , phoneno , dob})

  const subject = "Welcome to Our Platform!";
    const text = `Hi ${name}, Congratulations! Your account has been created successfully.`;
    const html = `<h1>Welcome, ${name}!</h1><p>Thank you for signing up. Start exploring our platform now!</p>`;

    const isEmailSent = await sendEmail(email, subject, text, html);
  
  res.status(200).send({
    success : true,
    data : userCreate,
    message : "User created successfully"
  })



  }catch(error){
    console.log(error);
   return  res.status(500).send({
      success : false,
      message : "Error to create user",
      error : error.message
    })
  }
} 



exports.signIn = async(req,res) => {
  try{
  const {email , password} = req.body

  if(!email || !password){
   return  res.status(400).send({
      success : false,
      message : "All details are required"
    })
  }
 
  const existUser = await user.findOne({email})
  if(!existUser){
    return res.status(400).send({
      success : false,
      message : "Email not found! Please signup"
    })
  }

  const existPassword = await bcrypt.compare(password , existUser.password)
  if(!existPassword){
    return res.status(400).send({
      success : false,
      message : "Invalid password , try again"
    })
  }

  const payload = {
    name: existUser.name,
    id: existUser._id,
    email: existUser.email
  }

  const token = await jwt.sign(payload , process.env.SECRET_KEY , {expiresIn : "3d"}) 

  const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days in milliseconds
    httpOnly: true,
  };
  res.cookie("token" , token , cookieOptions).status(200).send({
    success : true,
    user : {
      name : existUser.name,
      email : existUser.email,
      phoneno : existUser.phoneno,
      dob : existUser.dob,
      token : token
    },
    message : "User logged in successfully"
  })

  }catch(error){
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error to login",
      error : error.message
    })
  }
}