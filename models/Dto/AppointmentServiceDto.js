import Joi from "joi";
const schema = Joi.object().keys({
    name: Joi.string().required(),
    price:Joi.number().required(),
    slots:Joi.array().required()
})
const validateAppointment = (date) => {
    const result = schema.validate(date)
    return result
}

export default validateAppointment