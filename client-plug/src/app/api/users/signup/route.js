import { connectDb } from "@/dbConfig/dbConfig.js";
import { UserModel } from "@/models/userModel.js";
import jwt from 'jsonwebtoken';
import validator from "validator";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

dotenv.config();

const creatUser = async () =>{

    try {
        const reqBody = await req.json();

        const { username, email, password, pwdRepeat }= reqBody;
    
        if(!username || !email || !password ||!pwdRepeat ){
            return new NextResponse.json({success:false, message:"!All Filed require"})
        };
        
        if(!validator.isEmail(email)){
            if(userExist){
                return new NextResponse.json({success:false, message:"!Email not valid"});
            };
        }
    
        const userExist = UserModel.find(email);
        if(userExist){
            return new NextResponse.json({success:false, message:"!User exist"});
        };
    
        if(password.legth < 8){
            return new NextResponse.json({success:false, message:"!Password too short"});
        };
    
        const isPassMatch = await bcrypt.compare(password, pwdRepeat);
        if(!isPassMatch){
            return new NextResponse.json({success:false, message:"!Password not match"});
        };
    
        const hashPwd = await bcrypt.hash(password, 10)
    
        const newUser = await new UserModel({
            username,
            email,
            password:hashPwd
        });
    
        const userData = [
            username,
            email,
            password
        ];
    
        await newUser.save();
    
        const token = jwt.sign(userData, process.env.TOKEN_KEY);
    
        const res = NextResponse.json({success:true, message:"User added"});
        res.cookies.set("token", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:2*24*60*60,
            path:"/",
        });
        return res
    
    } catch (error) {
        console.log("Error", error);
        return new NextResponse.json({message:"Error", success:false});
    }
};

export {creatUser}


