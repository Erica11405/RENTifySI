import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

export default function Paypal({ amount, bookingId, onPaymentSuccess }) {
  const paypalRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.paypal) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AQs1Es03lDnrOyrXCVEsEcrVqan-k-1llTNFVQ54KTDZVnIkkY96aTKW8FEMTfMeI3ZL1lEdrCOsG99Y&currency=PHP";
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("PayPal SDK failed to load");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !amount || Number(amount) <= 0) return;

    paypalRef.current.innerHTML = "";

    const createButton = (fundingSource) => {
      window.paypal.Buttons({
        fundingSource,
        style: {
          layout: "horizontal",
          height: 35,
          tagline: false,
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { currency_code: "PHP", value: Number(amount).toString() },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Payment successful:", order);
          alert("Payment completed successfully!");

          // await axios.patch(
          //   `https://rentifysi.onrender.com/api/book_car/${bookingId}/`,
          //   { status: "done" }
          // );

        
          if (onPaymentSuccess) onPaymentSuccess();
        },
        onError: (err) => {
          console.error("PayPal Error:", err);
          alert("Payment failed. Please try again.");
        },
      }).render(paypalRef.current);
    };

    createButton(window.paypal.FUNDING.PAYPAL);
    createButton(window.paypal.FUNDING.CARD);

  }, [loaded, amount]);

  return <div ref={paypalRef} className="paypal-buttons-container"></div>;
}
