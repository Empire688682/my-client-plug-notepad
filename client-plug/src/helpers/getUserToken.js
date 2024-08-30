import {NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


export const getUserToken = async(req) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        return decodedToken.userId;
    } catch (error) {
        console.log("getUserToken", error);
        return new NextResponse.json({success:false, message:"ERROR"});
    }
};
