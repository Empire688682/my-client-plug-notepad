import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () =>{
    try {
     const response = await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
     if(response){
        console.log("Db Connected Successful");
     }
    } catch (error) {
        console.log("DbError", error)
    }
};

export  {connectDb}