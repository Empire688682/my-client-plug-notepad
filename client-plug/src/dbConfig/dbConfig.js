import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () =>{
    try {
     const response = await mongoose.connect(process.env.MONGODB_URI);
     if(response){
        console.log("Db Connected Successful");
     }
    } catch (error) {
        console("DbError", error)
    }
};

export  {connectDb}