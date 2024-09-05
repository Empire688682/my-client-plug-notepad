import { connectDb } from "@/dbConfig/dbConfig";
import { getToken } from "@/helpers/getUserToken";
import { NoteModel } from "@/models/noteModel";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";
connectDb();

const fetchUserNote = async (req) =>{
    try {
        const userId = await getToken(req);
        const user = await UserModel.findById(userId);
        if(!userId || !user){
            return NextResponse.json({success:false, message:"Not Authorize"});
        };

        const noteIds =  Array.from(user.noteData.keys());
        if (noteIds.length === 0) {
            return NextResponse.json({ success: false, message: "No notes available" });
        }

        const userNotes = await NoteModel.find({_id:{$in:noteIds}});

        return NextResponse.json({success:true, userNotes, message:"All Note fetched"});

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({success:false, message:"Note fetch Error"});
    };
};

export async function GET(req) {
    return fetchUserNote(req);
}