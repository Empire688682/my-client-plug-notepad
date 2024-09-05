import { connectDb } from "@/dbConfig/dbConfig";
import { NoteModel } from "@/models/noteModel";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";
connectDb();

const fetchUserNote = async (req) =>{
    try {
        
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({})
    }
}