import serviceModel from "../models/index.js"
import { NotFound } from "../utils/Error.js"

export const allAppointmentService = async (date) => {
    const appointmentDate={appointmentDate:date}
    const services = serviceModel.appointmentService 
    const options = await services.find().exec()
    const alreadyBooking =await serviceModel.booking.find(appointmentDate)
    options?.forEach(option => {
      const optionBooked =alreadyBooking.filter(book=>book.
          treatmentName === option.name)
        const bookedSlots = optionBooked.map(slot => slot.appointmentTime)
        const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot))
        option.slots=remainingSlots
    })
  
    if (options) {
        return options
    }
    throw new NotFound("Not-found")
}

export const appointmentPost =async (service) => {
    const model = await new serviceModel.appointmentService(service)
    if (model) {
        const saveService = model.save()
        return saveService
    }
    throw new NotFound("Not-Found")
}