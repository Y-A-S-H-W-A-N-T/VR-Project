import React from "react";
import axios from "axios";

import { CiBookmarkCheck } from "react-icons/ci";
function PayButton() {
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("/Payment/orders");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_ZyNtOeHRxPe7OE",
            amount: amount.toString(),
            currency: currency,
            name: "VIrtualEstate",
            
            
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("/payment/verify", data);

                alert(result.data.msg);
            },
          
           
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="">
                <button  className='p-2 inline-flex mt-4 pr-2 font-bold bg-green-200 border border-gray-500 text-slate-500  hover:bg-green-400  w-full rounded-full  ' onClick={displayRazorpay}>
                <CiBookmarkCheck size={24} className='mr-1' />  Book Now
                </button>
        </div>
    );
}

export default PayButton;