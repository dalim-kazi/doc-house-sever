import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    uid: { type:String, unique: true, required: true },
    email: { type:String, unique: true, required: true },
    photo: { type: String, unique: true, required: true },
    role:{type:String}
})

const user = mongoose.model("user", userSchema)
export default user