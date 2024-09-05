import { connectDb } from "@/dbConfig/dbConfig";
import { getToken } from "@/helpers/getUserToken";
import { NoteModel } from "@/models/noteModel";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";
connectDb();

const fetchUserNote = async (req) =>{
    try {
        const userId = await getToken(req);
        if(!user){
            return NextResponse.json({success:false, message:"Not Authorize"});
        };
        const user = await UserModel.findById(userId);
        if(!userId || !user){
            return NextResponse.json({success:false, message:"Not Authorize"});
        };

        const noteIds =  

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({success:false, message:"Note fetch Error"})
    }
};

export async function GET(req) {
    return fetchUserNote(req);
}