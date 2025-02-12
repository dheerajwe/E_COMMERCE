import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET);
}

// login //

const loginUser = async (req,res)=>{
  try{
  const{email,password}=req.body;
  const user=await userModel.findOne({email});
  if(!user){
    return res.json({success:"false",message:"user doesn't exist"});
  }
  const match=await bcrypt.compare(password,user.password);
  if(match){
   const token=await createToken(user._id);
   return res.json({success:true,token})
  }
  else{
    return res.json({success:false,message:"credentials wrong"})
  }
}catch(error){
  return res.json({success:"false",message:"some error"});
}

}

// register //

const registerUser = async (req,res)=>{
  try{
  const{name,email,password}=req.body;
  //checking if user exist
  const exists =await userModel.findOne({email});
  if(exists){
    return res.json({success:"false",message:"user already exists"});
  }
  //validate email format & strong password
  if(!validator.isEmail(email)){
   return res.json({success:"false",message:"enter valid email"});
  }
  if(password.length < 8){
   return res.json({success:"false",message:"enter strong password"});
  }
  //hashing a password
  const salt=await bcrypt.genSalt(10);
  const hashedPassword= await bcrypt.hash(password,salt);
  //saving this new password into database
  const newUser= new userModel({
    name,
    email,
    password:hashedPassword
  })
  const user = await newUser.save();
  const token=createToken(user._id);
  return res.json({success:true,token})
} catch(error) {
  console.log(error);
  return res.json({success:"false",message:"something not fine"});
}
}

// adminLogin //

const adminLogin = async(req,res)=>{
   try{
  const{email,password} = req.body;
  if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
    const token= jwt.sign(email+password,process.env.JWT_SECRET);
    return res.json({success:true,token})
  }else{
    res.json({success:false,message:"Invalid credentials"})
  }
}catch(error){
  return res.json({message:error});
}
}

export {loginUser,registerUser,adminLogin};