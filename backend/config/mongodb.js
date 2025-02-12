import mongoose from "mongoose";

const ConnectDB=async()=>{

  mongoose.connect(process.env.MONGODB_URL)
 .then(()=>console.log("Mongo DB Connected"));

}

export default ConnectDB;