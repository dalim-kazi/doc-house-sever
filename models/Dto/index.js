import validateAppointment from "./AppointmentServiceDto.js";
import validateBooking from "./BookingServiceDto.js";
import validateUser from './UserDto.js'
const validators = {
    appointmentServiceSchema:validateAppointment,
    bookingSchema: validateBooking,
    userSchema:validateUser
}
export default validators