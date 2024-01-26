import mongoose from "mongoose";

const appointmentServiceSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    price:{type:Number,required:true},
    slots:{type:Array,required:true}
})

const appointmentService = mongoose.model("appointmentService", appointmentServiceSchema)
export default appointmentService