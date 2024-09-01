import { connectDb } from "@/dbConfig/dbConfig.js";
import { UserModel } from "@/models/userModel.js";
import jwt from 'jsonwebtoken';
import validator from "validator";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { NextResponse } from "next/server";

dotenv.config();

// Ensure the database connection is established
connectDb();

const createUser = async (req) => {
    try {
        const reqBody = await req.json();
        const { username, email, password, pwdRepeat } = reqBody;
    
        // Validate input
        if (!username || !email || !password || !pwdRepeat) {
            return NextResponse.json({ success: false, message: "All fields are required" });
        }
        
        if (!validator.isEmail(email)) {
            return NextResponse.json({ success: false, message: "Invalid email" });
        }
    
        // Check if user already exists
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return NextResponse.json({ success: false, message: "User already exists" });
        }
    
        if (password.length < 8) {
            return NextResponse.json({ success: false, message: "Password too short" });
        }
    
        if (password !== pwdRepeat) {
            return NextResponse.json({ success: false, message: "Passwords do not match" });
        }
    
        // Hash the password
        const hashPwd = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new UserModel({
            username,
            email,
            password: hashPwd
        });
    
        const user = await newUser.save();
    
        // Create a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_KEY, { expiresIn: '2d' });
    
        // Prepare the response with the token
        return NextResponse.json({ success: true, user, token, message: "User created successfully" });
    
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ success: false, message: "An error occurred" });
    }
};

export async function POST(req) {
    return createUser(req);
}
