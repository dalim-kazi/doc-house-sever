import SSLCommerzPayment from "sslcommerz-lts";
import { NotFound } from "../utils/Error.js";
import { ObjectId } from 'bson';
import dotenv from 'dotenv';
import serviceModel from "../models/index.js";
dotenv.config();
const store_id =process.env.SSL_APP_ID;
const store_passwd =process.env.SSL_PASSWORD;
const is_live = false;

export const paymentService = async (bookingInformation) => {
    try {
        const {_id, treatmentName, patientName, phone, price, email } = bookingInformation;
        const data = {
            total_amount: price,
            currency: 'BDT',
            tran_id: _id,
            success_url: `https://doc-house-server-iota.vercel.app/payment/success?transactionId=${_id}`,
            fail_url: `https://doc-house-server-iota.vercel.app/payment/failed?transactionId=${_id}`,
            cancel_url: `https://doc-house-server-iota.vercel.app/payment/failed?transactionId=${_id}`,
            ipn_url:`https://doc-house-server-iota.vercel.app/payment/success?transactionId=${_id}` ,
            shipping_method: 'Courier',
            product_name: treatmentName,
            product_category: treatmentName,
            product_profile: 'general',
            cus_name: patientName,
            cus_email: email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: phone,
            cus_fax: phone,
            ship_name: patientName,
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        let GatewayPageURL = apiResponse.GatewayPageURL;
        return GatewayPageURL;
    } catch (error) {
        throw NotFound(error);
    }
};


export const paymentSuccess = async(transactionId) => {
    try {
        if (transactionId) {
            const query ={_id:transactionId?.transactionId}
            const booking = await serviceModel.booking.findOne(query)
            if (booking) {
                const options = { upsert: true }
               const updateOne = {
                   $set: {
                    paymentStatus:"Successful"
                   }
               }
               const result = await serviceModel.booking.updateOne(query, updateOne,options)
               return result
           }
            
        }
    }
    catch (error) {
        throw new NotFound(error)
    }
}

export const paymentFailed = async (transactionId) => {
   try {
    const query = { _id: transactionId?.transactionId }
    const booking = serviceModel.booking 
    const bookingFailed = await booking.findOne(query)
    if (bookingFailed) {
        const options = { upsert: true }
        const updateOne = {
            $set: {
                paymentStatus:"pending"
            }
        }
        const result = await booking.updateOne(query, updateOne, options)
        return result
    }
   }
   catch (error) {
    throw new NotFound(error)
   }
}


export const adminHome = async () => {
    try {
        // Fetch total appointments
        const totalAppointmentService = await serviceModel.appointmentService.estimatedDocumentCount();
        const totalBooking = await serviceModel.booking.countDocuments();
        const totalUser = await serviceModel.user.estimatedDocumentCount();
        const result = {
            totalAppointmentService,
            totalBooking,
            totalUser
        }
        return result
    } catch (error) {
        throw new NotFound(error)
    }
};