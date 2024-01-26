import serviceModel from "../models/index.js"
import { NotFound } from "../utils/Error.js"

export const allBookingGet = async() => {
    const booking =serviceModel.booking 
    const model = await booking.find()
    if (model) {
        return model
    }
    throw new NotFound("Not-Found")
}


export const bookingPost = async (booking) => {
    
    const query = {
        email: booking.email,
        appointmentDate: booking.appointmentDate,
        treatmentName:booking.treatmentName
    }
    const alreadyBooking = serviceModel.booking.find(query)
    if ((await alreadyBooking).length) {
        throw new NotFound("You already have a booking on")
    }
    const model = await new serviceModel.booking(booking)
    if (model) {
        const savaBooking = model.save()
        return savaBooking
    }
    throw new NotFound("Not-Found")
}

export const singleUserBooking = async(email) => {
    const booking = serviceModel.booking 
    const model = await booking.find(email)
    if (model) {
        return model
    }
    throw new NotFound("Not-Found")
}


export const bookingUpdate =async (bookingItem) => {
    const id = bookingItem._id 
    const query ={_id:id}
    const booking = serviceModel.booking 
    const model = await booking.findById(id)
    if (model) {
        model.appointmentDate=bookingItem.appointmentDate
        model.appointmentTime = bookingItem.appointmentTime 
        model.patientName=bookingItem.patientName
        model.phone = bookingItem.phone 
        model.treatmentName = bookingItem.treatmentName
        model.email = bookingItem.email 
        const savaBooking = model.save()
        return savaBooking
    }
    throw new NotFound("Not-Found")
}

export const bookingDelete = async(id) => {
    const query = { _id: id }
    const booking = serviceModel.booking 
    const model = await booking.findOne(query)
    if (model) {
        const deleteBooking = await booking.deleteOne(query)
        return deleteBooking
    }
    throw new NotFound("Not-Found")
}