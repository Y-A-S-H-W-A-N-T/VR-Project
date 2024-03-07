
import dotenv from "dotenv"
import crypto from "crypto"

import express from "express";
import Razorpay from "razorpay";
dotenv.config()
const rout = express.Router();


rout.post('/orders', async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
        key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
      });
  
      const options = {
        amount: 90000,
        currency: 'INR',
        receipt: 'receipt_order_74394',
      };
  
      const order = await instance.orders.create(options);
  
      if (!order) return res.status(500).send('Some error occured');
  
      res.json(order);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  rout.post('/success', async (req, res) => {
    try {
      const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      } = req.body;
  
      const shasum = crypto.createHmac('sha256',RAZORPAY_SECRET);
      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
      const digest = shasum.digest('hex');
  
      if (digest !== razorpaySignature)
        return res.status(400).json({ msg: 'Transaction not valid!' });
  
      const newPayment = PaymentDetails({
        razorpayDetails: {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        },
        success: true,
      });
  
      await newPayment.save();
  
      res.json({
        msg: 'success',
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
 export default rout;