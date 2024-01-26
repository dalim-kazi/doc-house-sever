import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    appointmentDate:{type:String,required:true},
    appointmentTime:{type:String,required:true},
    treatmentName:{type:String,required:true},
    patientName:{type:String,required:true},
    phone: { type: String, required: true },
    price: { type: Number, required:true},
    email: { type: String, required: true },
    paymentStatus:{type:String,required:true}
})

const booking = mongoose.model("booking", bookingSchema)
export default booking