import { connectDb } from "@/dbConfig/dbConfig";
import { getToken } from "@/helpers/getUserToken";
import { NoteModel } from "@/models/noteModel";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";

connectDb();

const editNote = async (req) => {
  try {
    const reqBody = await req.json();
    const { noteId, category, link, country, phone, email } = reqBody;

    // Check for missing fields
    if (!noteId || !category || !link || !country || !phone || !email) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
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
        message: "You do not have permission to edit this note",
      });
    }

    // Update the note
    note.category = category;
    note.link = link;
    note.country = country;
    note.phone = phone;
    note.email = email;

    await note.save(); // Corrected syntax

    // Return a success response
    return NextResponse.json({
      success: true,
      message: "Note edited successfully",
    });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({
      success: false,
      message: "Unable to edit note",
    });
  }
};

export async function POST(req) {
  return editNote(req);
}
