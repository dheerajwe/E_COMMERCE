import express from "express";
import cors from "cors";
import "dotenv/config";
import ConnectDB from "./config/mongodb.js";
import ConnectCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'


const app= express();

const port=process.env.port || 5000;

ConnectDB();

ConnectCloudinary();

// middlewares //

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// api endpoints //
app.use("/",userRoute);
app.use("/",productRoute);
app.use("/",cartRoute);
app.use("/",orderRoute);

app.get("/",(req,res)=>{
    res.send("Api Working");
})

app.listen(port,()=>{
    console.log("Backend Running on port " +port)
})