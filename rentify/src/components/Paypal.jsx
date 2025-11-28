import React, { useRef, useEffect, useState } from "react";

export default function Paypal({ amount }) {
  const paypalRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.paypal) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AQs1Es03lDnrOyrXCVEsEcrVqan-k-1llTNFVQ54KTDZVnIkkY96aTKW8FEMTfMeI3ZL1lEdrCOsG99Y&currency=PHP&intent=capture&components=buttons,funding-eligibility";
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("PayPal SDK failed to load");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !amount || Number(amount) <= 0) return;

    paypalRef.current.innerHTML = "";

    // PayPal button
    window.paypal.Buttons({
      style: {
        layout: "horizontal",
        height: 25,
        tagline: false,
      },
      fundingSource: window.paypal.FUNDING.PAYPAL,
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            { amount: { currency_code: "PHP", value: Number(amount).toString() } },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log("PayPal Payment successful:", order);
        alert("Payment completed successfully!");
      },
      onError: (err) => {
        console.error("PayPal Error:", err);
        alert("Payment failed. Please try again.");
      },
    }).render(paypalRef.current);

    // Card button
    window.paypal.Buttons({
      style: {
        layout: "horizontal",
        height: 25,
        tagline: false,
      },
      fundingSource: window.paypal.FUNDING.CARD,
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            { amount: { currency_code: "PHP", value: Number(amount).toString() } },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log("Card Payment successful:", order);
        alert("Card payment completed successfully!");
      },
      onError: (err) => {
        console.error("Card Payment Error:", err);
        alert("Card payment failed. Please try again.");
      },
    }).render(paypalRef.current);
  }, [loaded, amount]);

  return <div ref={paypalRef} className="paypal-buttons-container"></div>;
}
