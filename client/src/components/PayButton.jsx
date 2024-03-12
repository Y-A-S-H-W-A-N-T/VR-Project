import React from "react";
import axios from "axios";

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
            key: "rzp_test_DEAOCcSWLmxQVh",
            amount: amount.toString(),
            currency: currency,
            name: "VIrtualEstate",
            description: "Transaction",
            
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:3000/payment/success", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Soumya ",
                email: "Soumyabhai@example.com",
                contact: "9900000099",
            },
            notes: {
                address: "Virtual Estate",
            },
            theme: {
                color: "#61dagb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="">
                <button  className='p-3  mt-2 bg-slate-100 border border-gray-500 text-slate-500  hover:bg-green-300  w-full rounded-full ' onClick={displayRazorpay}>
                    Book Now!
                </button>
            
        </div>
    );
}

export default PayButton;