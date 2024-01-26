 
import ConfigureAppointmentServiceController from "./AppointmentServiceController/AppointmentServiceController.js"
import ConfigureBookingController from "./BookingController/BookingController.js"
import configureUserController from "./UserController/UserController.js"
import ConfigurePaymentController from "./paymentController/PaymentController.js"

const configure = (app) => {
    ConfigureAppointmentServiceController(app)
    ConfigureBookingController(app)
    configureUserController(app)
    ConfigurePaymentController(app)
}

export default configure