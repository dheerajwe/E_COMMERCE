import express from "express"
import {loginUser,registerUser,adminLogin}  from "../controllers/userControler.js"

const userRoute=express.Router();

userRoute.post("/register",registerUser);

userRoute.post("/login",loginUser);

userRoute.post("/admin",adminLogin);

export default userRoute;
