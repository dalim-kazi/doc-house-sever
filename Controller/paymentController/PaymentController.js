import  express  from "express";
import { adminHome, paymentFailed, paymentService, paymentSuccess } from "../../Services/paymentService.js";
import handleJwtTokenVerify from "../../Middleware/handleJwtTokenVerify.js";
import handleAdminVerify from "../../Middleware/handleAdminVerify.js";
const router = express.Router()


const handlePayment = async(req,res,next) => {
    try {
        const bookingInformation = req.body
        const result = await paymentService(bookingInformation)
        res.send({url: result})
    }
    catch (error) {
        return next(error,req,res)
    } 
    
}

const handlePaymentSuccess = async(req,res,next) => {
    try {
        const transactionId = req.query 
       if (!transactionId) {
        return res.redirect("https://doc-houses.web.app/paymentFailed")
        }
        const result = await paymentSuccess(transactionId)
        if (result.modifiedCount > 0) {
            res.redirect(`https://doc-houses.web.app/dashboard/userBooking`)
        }
    }
    catch (error) {
        return next(error,req,res)
    }
}

const handlePaymentFailed = async(req, res, next) => {
  try {
      const transactionId = req.query  
      const result = await paymentFailed(transactionId)
      res.redirect("http://localhost:5173/paymentFailed")
  }
  catch (error) {
    return next(error,req,res)
  }
}


const handleAdminHome = async(req,res,next) => {
    try {
        const result = await adminHome()
         res.send(result)
    }
    catch (error) {
        
    }
}

router.post("/", handlePayment)
router.post("/success",handlePaymentSuccess)
router.post('/failed', handlePaymentFailed)
router.get("/adminHome",handleJwtTokenVerify,handleAdminVerify, handleAdminHome)
const ConfigurePayment = (app) => {
    app.use("/payment",router)
}
export default ConfigurePayment