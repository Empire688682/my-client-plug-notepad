import { connectDb } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { NoteModel } from "@/models/noteModel.js";

connectDb();

const addNote = async (req) => {
    try {
        const reqBody = await req.json();
        const { category, link, country, phone, email } = reqBody;

        // Validate all required fields
        if (!category || !link || !country || !phone || !email) {
            return NextResponse.json({ success: false, message: "All fields are required" });
        }

        // Create and save the new note
        const newNote = new NoteModel({
            category,
            link,
            country,
            phone,
            email
        });

        const note = await newNote.save();
        console.log("NOTE:", note);

        return NextResponse.json({ success: true, note, message: "Note added successfully" });

    } catch (error) {
        console.error("Error adding note:", error); // Log the error for debugging
        return NextResponse.json({ success: false, message: "An error occurred while adding the note" });
    }
};

export async function POST(req) {
    return addNote(req);
}
