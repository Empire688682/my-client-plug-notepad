import { connectDb } from "@/dbConfig/dbConfig.js";
import { UserModel } from "@/models/userModel.js";
import jwt from 'jsonwebtoken';
import validator from "validator";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
import { NextResponse } from "next/server";

dotenv.config();

// Ensure the database connection is established
connectDb();

const loginUser = async (req) => {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
    
        // Validate input
        if (!email || !password) {
            return NextResponse.json({ success: false, message: "All fields are required" });
        }
        
        if (!validator.isEmail(email)) {
            return NextResponse.json({ success: false, message: "Invalid email" });
        }
    
        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "No user found" });
        }

        // Compare password
        const isPwdMatch = await bcrypt.compare(password, user.password);
        if (!isPwdMatch) {
            return NextResponse.json({ success: false, message: "Incorrect password" });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            userName: user.userName,
            email: user.email
        };
        
        // Create JWT token
        const token = jwt.sign(tokenData, process.env.TOKEN_KEY, { expiresIn: '2d' });
    
        // Prepare the response with the token
        const res = NextResponse.json({ success: true, user, message: "User Login" });
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 2 * 24 * 60 * 60, // 2 days
            path: "/",
        });
        return res;
    
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ success: false, message: "An error occurred" });
    }
};

export async function POST(req) {
    return loginUser(req);
  }
