import serviceModel from "../models/index.js"
import { NotFound } from "../utils/Error.js"

// admin
export const adminGet = async(email) => {
    const query ={email:email}
    const user = serviceModel.user 
    const model =await user.findOne(query)
    if (model.role === "admin") {
        return {role:"admin"}
    }
    throw new NotFound("Not-Found")
}


export const allUserGet = async () => {
    const user = serviceModel.user
    const model = await user.find()
    if (model) {
        return model
    }
    throw new NotFound("Not-found")
}

export const userPost = async (user) => {
    const previousUser = new serviceModel.user(user)
    if (previousUser) {
        const saveUser = previousUser.save()
        return saveUser
    }
    throw new NotFound("Not-found")
}

export const userUpdate = async (user) => {
    const id = user._id
    const previousUser = serviceModel.user
    const model = await previousUser.findById(id)
    if (model) {
        model.name = user.name,
            model.email = user.email,
            model.photo = user.photo
            model.uid = user.uid,
            model.role = user.role
        model.save()
        return model
    }
    throw new NotFound("Not-Found")
}


export const deleteUser = async (email) => {
    const user = serviceModel.user 
    const model = await user.findOne(email)
    if (model) {
        const deleteUser = await user.deleteOne(email)
        return deleteUser
    }
    throw new NotFound("Not-Found")
}