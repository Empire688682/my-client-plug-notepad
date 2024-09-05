import { connectDb } from "@/dbConfig/dbConfig";
import { getToken } from "@/helpers/getUserToken";
import { NoteModel } from "@/models/noteModel";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";

connectDb();


const deleteNote = async (req) => {
    try {
      const reqBody = await req.json();
      const { noteId} = reqBody;
  
      // Check for missing fields
      if (!noteId) {
        return NextResponse.json({
          success: false,
          message: "No note found"
        });
      }
  
      const userId = await getToken(req);
      if (!userId) {
        return NextResponse.json({
          success: false,
          message: "You are not authorized",
        });
      }
  
      // Find the note by ID
      const note = await NoteModel.findById(noteId);
      if (!note) {
        return NextResponse.json({
          success: false,
          message: "Note not found",
        });
      }
  
      // Check if the note belongs to the user
      if (note.userId.toString() !== userId) {
        return NextResponse.json({
          success: false,
          message: "You do not have permission to delete this note",
        });
      }
  
      await NoteModel.findByIdAndDelete(note._id)

      // Update the note
      const user = await UserModel.findById(userId);
      if (user && user.noteData) {
        user.noteData.delete(noteId); // Use Map's delete method to remove the note ID
        await user.save(); // Save the updated user data
      }
  
      // Return a success response
      return NextResponse.json({
        success: true,
        message: "Note deleteed successfully",
      });
    } catch (error) {
      console.error("ERROR:", error);
      return NextResponse.json({
        success: false,
        message: "Unable to delete note",
      });
    }
  };
  
  export async function POST(req) {
    return deleteNote(req);
  }