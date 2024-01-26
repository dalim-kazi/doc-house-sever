import express from "express";
import { allAppointmentService, appointmentPost } from "../../Services/appointmentService.js";

import validators from "../../models/Dto/index.js";
import handleValidate from "../../Middleware/handleValidate.js";

const router = express.Router()

const handleGetServiceAppointment =async (req,res ,next) => {
  try {
     const date =req.query.date
    const result = await allAppointmentService(date)
    res.send(result)
   } catch (error) {
     return next(error,req,res)
   }
}

const handleAppointmentPost = async(req, res, next) => {
  try {
    const body = req.body 
    const result =await appointmentPost(body)
    res.send(result)
  } catch (error) {
    return next(error,req,res)
  }
}


router.get("/", handleGetServiceAppointment)
router.post("/",handleValidate(validators.appointmentServiceSchema) ,handleAppointmentPost)
const ConfigureAppointment = (app) => {
    app.use("/appointmentService", router)
}

export default ConfigureAppointment