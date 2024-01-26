import express from "express";
import { allBookingGet, bookingDelete, bookingPost, bookingUpdate, singleUserBooking } from "../../Services/bookingServices.js";
import handleValidate from "../../Middleware/handleValidate.js";
import validators from "../../models/Dto/index.js";
import handleJwtTokenVerify from "../../Middleware/handleJwtTokenVerify.js";
import handleAdminVerify from "../../Middleware/handleAdminVerify.js";
const router = express.Router()


const handleBookingGet = async (req, res, next) => {
   try {
      const result = await allBookingGet()
      res.send(result)
   } catch (error) {
      return next(error, req, res)
   }
}
const handleBookingPost = async (req, res, next) => {
   try {
      const body = req.body
      const result = await bookingPost(body)
      res.send(result)
   } catch (error) {
      return next(error, req, res)
   }
}
const handleSingleUserBookingGet = async (req, res, next) => {
   try {
      const email = req.query.email
      const query = { email }
      const result = await singleUserBooking(query)
      res.send(result)
   } catch (error) {
      return next(error, req, res)
   }
}

const handleBookingUpdate =async (req,res,next) => {
   try {
      const bookingItem = req.body 
      const result = await bookingUpdate(bookingItem)
      res.send(result)
   }
   catch (error) {
      return next(error.req,res)
   }
}

const handleDeleteBooking =async (req,res,next) => {
 try {
   const id = req.query.id 
   const result = await bookingDelete(id)
   res.send(result)
 } catch (error) {
   return next(error,req,res)
 }
}


router.get("/", handleJwtTokenVerify, handleAdminVerify, handleBookingGet)
router.get('/userBooking', handleJwtTokenVerify, handleSingleUserBookingGet)
router.post("/", handleValidate(validators.bookingSchema), handleBookingPost)
router.put("/",handleJwtTokenVerify,handleBookingUpdate)
router.delete("/",handleJwtTokenVerify,handleDeleteBooking)
const ConfigureBooking = (app) => {
   app.use("/booking", router)
}
export default ConfigureBooking