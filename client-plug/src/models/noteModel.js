import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    category:{type:String, required:true},
    link:{type:String, required:true},
    country:{type:String, required:true},
    phone:{type:String, required:true},
    email:{type:String, required:true},
    userId:{type:String, required:true},
});

export const NoteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);