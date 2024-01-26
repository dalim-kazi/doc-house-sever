import express from "express";
import Jwt from "jsonwebtoken";
import { adminGet, allUserGet, deleteUser, userPost, userUpdate } from "../../Services/UserService.js";
import handleValidate from "../../Middleware/handleValidate.js";
import validators from "../../models/Dto/index.js";
import handleJwtTokenVerify from "../../Middleware/handleJwtTokenVerify.js";
import handleAdminVerify from "../../Middleware/handleAdminVerify.js";

const router = express.Router()


// jwt token
const handleJwtTokenPost = (req, res, next) => {
    try {
        const user = req.body
        const token = Jwt.sign(user, process.env.JWT_TOKEN)
        res.send({ token })
    } catch (error) {
        return next(error, req, res)
    }
}

// admin

const handleAdmin = async (req, res, next) => {
    try {
        const email = req.query.email
        const result = await adminGet(email)
        res.send(result)
    } catch (error) {
        return next(error, req, res)
    }
}


const handleAllUserGet = async (req, res, next) => {
    try {
        const result = await allUserGet()
        res.send(result)
    } catch (error) {
        return next(error, req, res)
    }
}


const handleUserPost = async (req, res, next) => {
    try {
        const user = req.body
        const result = await userPost(user)
        res.send(result)
    } catch (error) {
        return next(error, req, res)
    }
}

const handleUpdateUser = async (req, res, next) => {
    try {
        const user = req.body
        const result = await userUpdate(user)
        res.send(result)
    } catch (error) {
        return next(error, req, res)
    }
}

const handleDeleteUser = async (req, res, next) => {
    try {
        const email = req.query.email
        const query = { email: email }
        const result = await deleteUser(query)
        res.send(result)
    }
    catch (error) {
        return next(error, req, res)
    }
}
router.get("/", handleJwtTokenVerify, handleAdminVerify, handleAllUserGet)
router.post("/", handleValidate(validators.user), handleUserPost)
router.put("/", handleUpdateUser)


// admin
router.get("/admin", handleJwtTokenVerify, handleAdmin)
// jwt
router.post("/jwt", handleJwtTokenPost)
router.delete("/", handleDeleteUser)
const configureUser = (app) => {
    app.use('/user', router)
}

export default configureUser