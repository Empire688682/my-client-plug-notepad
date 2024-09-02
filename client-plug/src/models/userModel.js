import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    pwdRepeat:{type:String, required:false},
    noteData: { type: Map, of: Object, default: {} },
}, {minimize:false});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);