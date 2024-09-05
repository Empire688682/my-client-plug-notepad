import { connectDb } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { NoteModel } from "@/models/noteModel.js";
import { UserModel } from "@/models/userModel";
import { getToken } from "@/helpers/getUserToken";

connectDb();
const addNote = async (req) => {
    try {
        const userId = await getToken(req);
        if (!userId) {
            return NextResponse.json({ success: false, message: "You are not authorized" });
        }

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
            email,
            userId
        });

        const note = await newNote.save();
        console.log("New note saved:", note);

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, message: "No user found" });
        }

        // Log the current noteData
        console.log("User noteData before update:", user.noteData);

        // Add the new note to the user's noteData
        user.noteData = user.noteData || {};
        user.noteData.set(note._id.toString())

        // Log the updated noteData
        console.log("User noteData after update:", user.noteData);

        // Save the updated user data
        await user.save();

        // Log a confirmation after save
        console.log("User data after saving:", user);

        return NextResponse.json({ success: true, note, message: "Note added successfully" });

    } catch (error) {
        console.error("Error adding note:", error);
        return NextResponse.json({ success: false, message: "An error occurred while adding the note" });
    }
};

export async function POST(req) {
    return addNote(req);
}
