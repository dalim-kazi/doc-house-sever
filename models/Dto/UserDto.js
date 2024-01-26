 import Joi from "joi"

const schema = Joi.object().keys({
    name: Joi.string().required(),
    uid: Joi.string().required(),
    email: Joi.string()
        .email().required(),
    photo: Joi.string().required(),
    role:Joi.string()
})

const validateUser = (data) => {
    const result = schema.validate(data)
    return result
}

export default validateUser