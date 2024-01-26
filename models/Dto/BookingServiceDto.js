import Joi from "joi";
const schema = Joi.object().keys({
    appointmentDate:Joi.string().required(),
    appointmentTime:Joi.string().required(),
    treatmentName:Joi.string().required(),
    patientName:Joi.string().required(),
    phone: Joi.string().max(11).min(11),
    price:Joi.number().required(),
    email: Joi.string().required(),
    paymentStatus:Joi.string().required()
})

const validateBooking = (data) => {
    const result = schema.validate(data)
    return result
}
export default validateBooking