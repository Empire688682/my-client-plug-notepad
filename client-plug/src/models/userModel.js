import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    password:{type:String, required:true},
    pwdRepeat:{type:String, required:false},
    noteData:{type:Object, default:{}},
}, {minimize:true});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);