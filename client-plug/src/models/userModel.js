import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    pwdRepeat:{type:String, required:false},
    noteData:{type: Array, default: [] }, // Correctly define noteData as an array of objects
}, {minimize:true});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);